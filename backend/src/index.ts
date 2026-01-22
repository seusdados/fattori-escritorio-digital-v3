import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

// Health check
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
      .order('titulo');

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar playbook por ID
app.get('/api/playbooks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('playbooks_v3')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== STEPCARDS ====================

// Listar stepcards de um playbook
app.get('/api/playbooks/:playbookId/steps', async (req, res) => {
  try {
    const { playbookId } = req.params;
    const { data, error } = await supabase
      .from('stepcards_v2')
      .select('*')
      .eq('playbook_id', playbookId)
      .order('ordem');

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
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
      .order('preco_centavos');

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar serviço por ID
app.get('/api/servicos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== DIAGNÓSTICO ====================

// Processar diagnóstico e retornar playbook recomendado
app.post('/api/diagnostico', async (req, res) => {
  try {
    const { respostas } = req.body;
    
    // Lógica de roteamento baseada nas respostas
    let vertical = '';
    let perfilUsuario = 'CONSUMIDOR';
    
    // Determinar vertical
    if (respostas.vertical === 'golpe_pix') {
      vertical = 'pix';
    } else if (respostas.vertical === 'conta_problema') {
      vertical = 'redes_sociais';
      perfilUsuario = respostas.perfil === 'vitima' ? 'VITIMA' : 'ACUSADO';
    } else if (respostas.vertical === 'consumidor') {
      vertical = 'consumidor';
    } else if (respostas.vertical === 'plano_saude') {
      vertical = 'saude';
    }
    
    // Buscar playbooks da vertical
    const { data: playbooks, error } = await supabase
      .from('playbooks_v3')
      .select('*')
      .eq('vertical', vertical)
      .eq('perfil_usuario', perfilUsuario)
      .eq('ativo', true);

    if (error) throw error;

    // Retornar o primeiro playbook matching (pode melhorar com ML depois)
    const playbook = playbooks?.[0];
    
    if (!playbook) {
      return res.status(404).json({ 
        success: false, 
        error: 'Nenhum playbook encontrado para este caso' 
      });
    }

    // Buscar steps do playbook
    const { data: steps } = await supabase
      .from('stepcards_v2')
      .select('*')
      .eq('playbook_id', playbook.id)
      .order('ordem');

    res.json({ 
      success: true, 
      data: {
        playbook,
        steps: steps || [],
        confianca: 92,
        alertas: playbook.urgencia === 'emergencia' 
          ? ['⏰ ATENÇÃO: Situação de emergência! Siga os passos imediatamente.']
          : []
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== CASOS DE USUÁRIO ====================

// Criar novo caso
app.post('/api/casos', async (req, res) => {
  try {
    const { playbook_id, email, telefone, dados_caso } = req.body;
    
    const { data, error } = await supabase
      .from('casos_usuario')
      .insert({
        playbook_id,
        email,
        telefone,
        dados_caso,
        status: 'em_andamento'
      })
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Atualizar progresso do caso
app.patch('/api/casos/:id/progresso', async (req, res) => {
  try {
    const { id } = req.params;
    const { step_atual, steps_concluidos } = req.body;
    
    const { data, error } = await supabase
      .from('casos_usuario')
      .update({ 
        step_atual,
        steps_concluidos,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== CHECKOUT (Simulado) ====================

app.post('/api/checkout', async (req, res) => {
  try {
    const { servico_id, caso_id, email } = req.body;
    
    // Buscar serviço
    const { data: servico, error } = await supabase
      .from('servicos')
      .select('*')
      .eq('id', servico_id)
      .single();

    if (error) throw error;

    // Simular criação de checkout (integrar com Stripe/PagSeguro depois)
    const checkoutUrl = `https://checkout.fattori.com.br/pay?` +
      `servico=${servico_id}&caso=${caso_id}&email=${encodeURIComponent(email)}`;

    res.json({ 
      success: true, 
      data: {
        checkout_url: checkoutUrl,
        servico: servico.nome,
        valor: servico.preco_centavos / 100,
        mensagem: 'Checkout simulado - integrar gateway de pagamento'
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Erro interno do servidor' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Fattori API rodando na porta ${PORT}`);
  console.log(`📊 Supabase: ${supabaseUrl ? 'Conectado' : 'Não configurado'}`);
});

export default app;
