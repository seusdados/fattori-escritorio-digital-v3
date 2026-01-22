require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== PLAYBOOKS ====================

// Listar todos os playbooks
app.get('/api/playbooks', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('playbooks_v3')
      .select('*')
      .eq('ativo', true)
      .order('vertical', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar playbooks:', error);
    res.status(500).json({ error: 'Erro ao buscar playbooks' });
  }
});

// Buscar playbook por ID
app.get('/api/playbooks/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('playbooks_v3')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Playbook não encontrado' });
    
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar playbook:', error);
    res.status(500).json({ error: 'Erro ao buscar playbook' });
  }
});

// Buscar playbooks por vertical
app.get('/api/playbooks/vertical/:vertical', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('playbooks_v3')
      .select('*')
      .eq('vertical', req.params.vertical)
      .eq('ativo', true);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar playbooks:', error);
    res.status(500).json({ error: 'Erro ao buscar playbooks' });
  }
});

// ==================== STEPCARDS ====================

// Buscar steps de um playbook
app.get('/api/stepcards/:playbookId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stepcards_v2')
      .select('*')
      .eq('playbook_id', req.params.playbookId)
      .order('ordem', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar stepcards:', error);
    res.status(500).json({ error: 'Erro ao buscar stepcards' });
  }
});

// ==================== SERVIÇOS ====================

// Listar serviços
app.get('/api/servicos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .eq('ativo', true)
      .order('preco_centavos', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
});

// Buscar serviços por playbook
app.get('/api/servicos/playbook/:playbookId', async (req, res) => {
  try {
    const { data: playbook, error: pbError } = await supabase
      .from('playbooks_v3')
      .select('servicos_relacionados')
      .eq('id', req.params.playbookId)
      .single();

    if (pbError) throw pbError;

    if (!playbook?.servicos_relacionados?.length) {
      return res.json([]);
    }

    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .in('id', playbook.servicos_relacionados)
      .eq('ativo', true);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
});

// ==================== DIAGNÓSTICO ====================

// Motor de diagnóstico
app.post('/api/diagnostico', async (req, res) => {
  try {
    const { respostas } = req.body;
    
    // Lógica de roteamento baseada nas respostas
    let playbookId = null;
    let confianca = 85;
    let alertas = [];

    const { vertical, detalhe, urgencia, perfil } = respostas;

    // Roteamento por vertical
    if (vertical === 'pix_fraude') {
      if (detalhe === 'falso_deposito') {
        playbookId = 'PB_PIX_FALSO_DEPOSITO';
        if (urgencia === 'emergencia') {
          alertas.push('⏰ URGENTE: O MED só funciona em até 72 horas!');
          confianca = 95;
        }
      } else if (detalhe === 'conta_invadida') {
        playbookId = 'PB_PIX_CONTA_INVADIDA';
      } else {
        playbookId = 'PB_PIX_OUTROS';
      }
    } else if (vertical === 'rede_social') {
      if (perfil === 'acusado') {
        if (detalhe === 'conta_suspensa') {
          playbookId = 'PB_INSTAGRAM_SUSPENSAO';
        } else {
          playbookId = 'PB_FACEBOOK_SUSPENSAO';
        }
      } else if (perfil === 'vitima') {
        if (detalhe === 'difamacao') {
          playbookId = 'PB_VITIMA_DIFAMACAO';
        } else if (detalhe === 'perfil_falso') {
          playbookId = 'PB_VITIMA_PERFIL_FALSO';
        } else {
          playbookId = 'PB_VITIMA_OUTROS';
        }
      }
    } else if (vertical === 'consumidor') {
      if (detalhe === 'nao_entregue') {
        playbookId = 'PB_ML_NAO_ENTREGUE';
      } else if (detalhe === 'produto_defeito') {
        playbookId = 'PB_CONSUMIDOR_DEFEITO';
      } else {
        playbookId = 'PB_CONSUMIDOR_OUTROS';
      }
    } else if (vertical === 'plano_saude') {
      playbookId = 'PB_PLANO_SAUDE_NEGATIVA';
    }

    // Fallback
    if (!playbookId) {
      playbookId = 'PB_PIX_FALSO_DEPOSITO';
      confianca = 60;
    }

    // Buscar playbook
    const { data: playbook, error } = await supabase
      .from('playbooks_v3')
      .select('*')
      .eq('id', playbookId)
      .single();

    if (error || !playbook) {
      // Tentar buscar qualquer playbook como fallback
      const { data: fallback } = await supabase
        .from('playbooks_v3')
        .select('*')
        .eq('ativo', true)
        .limit(1)
        .single();
      
      return res.json({
        playbook_id: fallback?.id || playbookId,
        playbook: fallback,
        confianca: 60,
        alertas: ['Diagnóstico aproximado - recomendamos validação com advogado']
      });
    }

    res.json({
      playbook_id: playbookId,
      playbook,
      confianca,
      alertas
    });
  } catch (error) {
    console.error('Erro no diagnóstico:', error);
    res.status(500).json({ error: 'Erro ao processar diagnóstico' });
  }
});

// ==================== CASOS DO USUÁRIO ====================

// Criar caso
app.post('/api/casos', async (req, res) => {
  try {
    const { playbook_id, respostas_wizard, email, telefone } = req.body;

    const { data, error } = await supabase
      .from('casos_usuario')
      .insert({
        playbook_id,
        respostas_wizard,
        email,
        telefone,
        status: 'diagnostico_completo'
      })
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao criar caso:', error);
    res.status(500).json({ error: 'Erro ao criar caso' });
  }
});

// Atualizar progresso do caso
app.patch('/api/casos/:id/progresso', async (req, res) => {
  try {
    const { step_atual, steps_completos } = req.body;

    const { data, error } = await supabase
      .from('casos_usuario')
      .update({
        step_atual,
        steps_completos,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    res.status(500).json({ error: 'Erro ao atualizar progresso' });
  }
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Fattori API rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
