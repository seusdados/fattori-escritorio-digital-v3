import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { DiagnosticoRespostas, DiagnosticoResultado, Playbook, StepCard } from '../types';

// Playbooks locais (fallback se API não disponível)
const PLAYBOOKS: Record<string, Playbook> = {
  PB_PIX_FALSO_DEPOSITO: {
    id: "PB_PIX_FALSO_DEPOSITO",
    titulo: "Golpe do Falso Depósito PIX",
    descricao: "Transferiu dinheiro após receber comprovante falso",
    vertical: "pix",
    perfil_usuario: "VITIMA",
    urgencia: "emergencia",
    tempo_estimado_minutos: 45,
    fundamento_legal: "Art. 171 CP - Estelionato + MED 2.0 (Res. BCB 103/2021)",
    palavras_chave: ["pix", "golpe", "falso", "comprovante"],
    ativo: true,
    created_at: "",
    updated_at: ""
  },
  PB_INSTAGRAM_SUSPENSAO: {
    id: "PB_INSTAGRAM_SUSPENSAO",
    titulo: "Conta Instagram Suspensa",
    descricao: "Sua conta foi desativada ou suspensa pela plataforma",
    vertical: "redes_sociais",
    perfil_usuario: "ACUSADO",
    urgencia: "alta",
    tempo_estimado_minutos: 30,
    fundamento_legal: "CDC Art. 6º - Direito à informação + Marco Civil da Internet",
    palavras_chave: ["instagram", "suspensa", "desativada"],
    ativo: true,
    created_at: "",
    updated_at: ""
  },
  PB_ML_NAO_ENTREGUE: {
    id: "PB_ML_NAO_ENTREGUE",
    titulo: "Produto Não Entregue - Mercado Livre",
    descricao: "Comprou e pagou mas não recebeu o produto",
    vertical: "consumidor",
    perfil_usuario: "CONSUMIDOR",
    urgencia: "normal",
    tempo_estimado_minutos: 30,
    fundamento_legal: "CDC Art. 35 - Não cumprimento da oferta",
    palavras_chave: ["mercado livre", "não entregue", "produto"],
    ativo: true,
    created_at: "",
    updated_at: ""
  }
};

// Steps locais
const STEPS: Record<string, StepCard[]> = {
  PB_PIX_FALSO_DEPOSITO: [
    { id: "1", playbook_id: "PB_PIX_FALSO_DEPOSITO", ordem: 1, titulo: "Coleta Emergencial de Provas", objetivo: "Preservar evidências digitais antes que o golpista apague", passos: ["Faça print/screenshot da conversa COMPLETA com o golpista", "Salve todos os comprovantes PIX (enviados e recebidos)", "Anote: nome, CPF/CNPJ, banco e chave PIX do golpista", "Salve o perfil da rede social/anúncio onde encontrou"], dica: "Use a função 'Exportar conversa' do WhatsApp para ter backup completo", responsavel: "cliente", tempo_estimado_minutos: 10 },
    { id: "2", playbook_id: "PB_PIX_FALSO_DEPOSITO", ordem: 2, titulo: "Acionar MED 2.0 no Banco (URGENTE)", objetivo: "Solicitar bloqueio cautelar do valor em até 72h", passos: ["Ligue IMEDIATAMENTE para o SAC do seu banco", "Diga: 'Quero acionar o MED - Mecanismo Especial de Devolução por fraude PIX'", "Informe: valor, data/hora, chave PIX de destino", "ANOTE o número do protocolo e nome do atendente"], dica: "O MED só funciona em até 72h! Quanto antes, maior chance de recuperar", responsavel: "cliente", tempo_estimado_minutos: 20 },
    { id: "3", playbook_id: "PB_PIX_FALSO_DEPOSITO", ordem: 3, titulo: "Registrar Boletim de Ocorrência", objetivo: "Formalizar o crime para investigação policial", passos: ["Acesse a Delegacia Virtual do seu estado", "Selecione: Estelionato / Fraude Eletrônica", "Anexe todas as provas coletadas no passo 1", "Guarde o número do B.O. para acompanhamento"], dica: "O B.O. online tem a mesma validade do presencial", responsavel: "cliente", tempo_estimado_minutos: 15 }
  ],
  PB_INSTAGRAM_SUSPENSAO: [
    { id: "1", playbook_id: "PB_INSTAGRAM_SUSPENSAO", ordem: 1, titulo: "Verificar o Motivo da Suspensão", objetivo: "Entender qual regra foi supostamente violada", passos: ["Verifique seu e-mail cadastrado no Instagram", "Procure por notificação explicando o motivo", "Acesse instagram.com e tente fazer login", "Anote a mensagem de erro exata que aparece"], dica: "Cheque também a pasta de spam do e-mail", responsavel: "cliente", tempo_estimado_minutos: 10 },
    { id: "2", playbook_id: "PB_INSTAGRAM_SUSPENSAO", ordem: 2, titulo: "Solicitar Revisão Oficial", objetivo: "Usar o canal de recurso do Instagram", passos: ["Acesse: help.instagram.com", "Procure por 'Minha conta foi desativada'", "Preencha o formulário de recurso", "Aguarde resposta em até 30 dias"], dica: "Seja educado e objetivo no recurso", responsavel: "cliente", tempo_estimado_minutos: 15 }
  ],
  PB_ML_NAO_ENTREGUE: [
    { id: "1", playbook_id: "PB_ML_NAO_ENTREGUE", ordem: 1, titulo: "Abrir Reclamação no Mercado Livre", objetivo: "Usar o canal oficial de disputa da plataforma", passos: ["Acesse 'Minhas compras' no Mercado Livre", "Encontre o pedido e clique em 'Tenho um problema'", "Selecione: 'Não recebi o produto'", "Descreva o ocorrido e anexe provas"], dica: "Faça isso ANTES do prazo de proteção expirar", responsavel: "cliente", tempo_estimado_minutos: 10 },
    { id: "2", playbook_id: "PB_ML_NAO_ENTREGUE", ordem: 2, titulo: "Escalar para Mediação ML", objetivo: "Pedir intervenção do Mercado Livre na disputa", passos: ["Aguarde o prazo dado ao vendedor responder", "Se não resolver, clique em 'Pedir ajuda ao Mercado Livre'", "Forneça todas as informações solicitadas", "Acompanhe o andamento da mediação"], dica: "O ML costuma decidir em favor do comprador com bom histórico", responsavel: "cliente", tempo_estimado_minutos: 15 }
  ]
};

interface Pergunta {
  id: string;
  texto: string;
  opcoes: { value: string; label: string }[];
}

const perguntas: Pergunta[] = [
  {
    id: 'vertical',
    texto: 'Qual tipo de problema você está enfrentando?',
    opcoes: [
      { value: 'golpe_pix', label: '🚨 Golpe envolvendo PIX ou transferência' },
      { value: 'conta_problema', label: '🔒 Conta de rede social suspensa/hackeada' },
      { value: 'consumidor', label: '🛒 Problema com compra online' },
      { value: 'plano_saude', label: '🏥 Plano de saúde negou cobertura' }
    ]
  },
  {
    id: 'urgencia',
    texto: 'Qual a urgência da situação?',
    opcoes: [
      { value: 'emergencia', label: '⚡ Emergência - Aconteceu nas últimas 72h' },
      { value: 'alta', label: '⏰ Urgente - Preciso resolver esta semana' },
      { value: 'normal', label: '📋 Normal - Quero entender meus direitos' }
    ]
  }
];

interface WizardViewProps {
  onComplete: (resultado: DiagnosticoResultado) => void;
  onCancel: () => void;
}

export function WizardView({ onComplete, onCancel }: WizardViewProps) {
  const [step, setStep] = useState(0);
  const [respostas, setRespostas] = useState<DiagnosticoRespostas>({});

  const handleResposta = (valor: string) => {
    const novasRespostas = { ...respostas, [perguntas[step].id]: valor };
    setRespostas(novasRespostas);

    if (step < perguntas.length - 1) {
      setStep(step + 1);
    } else {
      // Determinar playbook baseado nas respostas
      let playbookId = 'PB_PIX_FALSO_DEPOSITO';
      if (novasRespostas.vertical === 'conta_problema') playbookId = 'PB_INSTAGRAM_SUSPENSAO';
      if (novasRespostas.vertical === 'consumidor') playbookId = 'PB_ML_NAO_ENTREGUE';

      const playbook = PLAYBOOKS[playbookId];
      const steps = STEPS[playbookId] || [];
      const alertas = playbookId === 'PB_PIX_FALSO_DEPOSITO' 
        ? ['⏰ ATENÇÃO: O MED só funciona em até 72 horas! Aja AGORA!']
        : [];

      onComplete({
        playbook_id: playbookId,
        playbook,
        steps,
        confianca: 92,
        alertas
      });
    }
  };

  const pergunta = perguntas[step];
  const progress = ((step + 1) / perguntas.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl animate-fade-in">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Diagnóstico</span>
            <span className="text-cyan-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-6">{pergunta.texto}</h2>
          
          <div className="space-y-3">
            {pergunta.opcoes.map((opcao) => (
              <button
                key={opcao.value}
                onClick={() => handleResposta(opcao.value)}
                className="w-full bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-blue-500 rounded-xl p-4 text-left text-white transition-all"
              >
                {opcao.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cancel */}
        <button
          onClick={onCancel}
          className="mt-6 text-slate-500 hover:text-slate-400 flex items-center gap-2 mx-auto transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
