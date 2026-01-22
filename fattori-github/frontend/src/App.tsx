import { useAppStore } from './store';
import { HomeView } from './views/HomeView';
import { WizardView } from './views/WizardView';
import { ResultadoView } from './views/ResultadoView';
import { FluxoView } from './views/FluxoView';
import { ConcluidoView } from './views/ConcluidoView';

// Dados locais para funcionamento offline
const PLAYBOOKS_LOCAL = {
  PB_PIX_FALSO_DEPOSITO: {
    id: 'PB_PIX_FALSO_DEPOSITO',
    titulo: 'Golpe do Falso Depósito PIX',
    descricao: 'Transferiu dinheiro após receber comprovante falso de depósito',
    vertical: 'pix_fraudes' as const,
    urgencia: 'emergencia' as const,
    perfil_usuario: 'VITIMA' as const,
    tempo_estimado_minutos: 45,
    fundamento_legal: 'Art. 171 CP - Estelionato + MED 2.0 (Res. BCB 103/2021)',
    quando_usar: ['Recebeu comprovante PIX falso', 'Transferiu após ver depósito que não existia'],
    servicos_relacionados: ['SRV_DOC_EXPRESS', 'SRV_NOTIFICACAO'],
    palavras_chave: ['pix', 'golpe', 'falso deposito', 'comprovante falso'],
    ativo: true,
    created_at: '',
    updated_at: ''
  },
  PB_INSTAGRAM_SUSPENSAO: {
    id: 'PB_INSTAGRAM_SUSPENSAO',
    titulo: 'Conta Instagram Suspensa',
    descricao: 'Sua conta foi desativada ou suspensa pela plataforma',
    vertical: 'redes_sociais_acusado' as const,
    urgencia: 'alta' as const,
    perfil_usuario: 'ACUSADO' as const,
    tempo_estimado_minutos: 30,
    fundamento_legal: 'CDC Art. 6º - Direito à informação + Marco Civil da Internet',
    quando_usar: ['Conta suspensa sem aviso', 'Recurso negado'],
    servicos_relacionados: ['SRV_NOTIFICACAO', 'SRV_RECURSO_ADMIN'],
    palavras_chave: ['instagram', 'conta suspensa', 'desativada'],
    ativo: true,
    created_at: '',
    updated_at: ''
  },
  PB_ML_NAO_ENTREGUE: {
    id: 'PB_ML_NAO_ENTREGUE',
    titulo: 'Produto Não Entregue - Mercado Livre',
    descricao: 'Comprou e pagou mas não recebeu o produto',
    vertical: 'consumidor' as const,
    urgencia: 'normal' as const,
    perfil_usuario: 'CONSUMIDOR' as const,
    tempo_estimado_minutos: 30,
    fundamento_legal: 'CDC Art. 35 - Não cumprimento da oferta',
    quando_usar: ['Prazo de entrega expirou', 'Vendedor não responde'],
    servicos_relacionados: ['SRV_RECLAMACAO', 'SRV_DOC_EXPRESS'],
    palavras_chave: ['mercado livre', 'não entregue', 'compra online'],
    ativo: true,
    created_at: '',
    updated_at: ''
  }
};

const STEPS_LOCAL = {
  PB_PIX_FALSO_DEPOSITO: [
    {
      id: '1',
      playbook_id: 'PB_PIX_FALSO_DEPOSITO',
      ordem: 1,
      titulo: 'Coleta Emergencial de Provas',
      objetivo: 'Preservar evidências digitais antes que o golpista apague',
      passos: [
        'Faça print/screenshot da conversa COMPLETA com o golpista',
        'Salve todos os comprovantes PIX (enviados e recebidos)',
        'Anote: nome, CPF/CNPJ, banco e chave PIX do golpista',
        'Salve o perfil da rede social ou anúncio onde encontrou'
      ],
      dica: 'Use a função "Exportar conversa" do WhatsApp para ter backup completo',
      responsavel: 'cliente' as const,
      tempo_estimado_minutos: 10,
      created_at: ''
    },
    {
      id: '2',
      playbook_id: 'PB_PIX_FALSO_DEPOSITO',
      ordem: 2,
      titulo: 'Acionar MED 2.0 no Banco (URGENTE)',
      objetivo: 'Solicitar bloqueio cautelar do valor em até 72 horas',
      passos: [
        'Ligue IMEDIATAMENTE para o SAC do seu banco',
        'Diga: "Quero acionar o MED - Mecanismo Especial de Devolução por fraude PIX"',
        'Informe: valor, data/hora da transferência, chave PIX de destino',
        'ANOTE o número do protocolo e nome do atendente'
      ],
      alerta: '⚠️ O MED só funciona em até 72 horas! Quanto antes, maior chance de recuperar',
      responsavel: 'cliente' as const,
      tempo_estimado_minutos: 15,
      created_at: ''
    },
    {
      id: '3',
      playbook_id: 'PB_PIX_FALSO_DEPOSITO',
      ordem: 3,
      titulo: 'Registrar Boletim de Ocorrência',
      objetivo: 'Formalizar o crime para investigação policial',
      passos: [
        'Acesse a Delegacia Virtual do seu estado',
        'Selecione: Estelionato / Fraude Eletrônica',
        'Descreva detalhadamente o ocorrido',
        'Anexe todas as provas coletadas no passo 1',
        'Guarde o número do B.O. para acompanhamento'
      ],
      dica: 'O B.O. online tem a mesma validade do presencial',
      responsavel: 'cliente' as const,
      tempo_estimado_minutos: 20,
      links_uteis: [
        { titulo: 'Delegacia Virtual SP', url: 'https://www.delegaciaeletronica.policiacivil.sp.gov.br/' }
      ],
      created_at: ''
    }
  ],
  PB_INSTAGRAM_SUSPENSAO: [
    {
      id: '4',
      playbook_id: 'PB_INSTAGRAM_SUSPENSAO',
      ordem: 1,
      titulo: 'Verificar o Motivo da Suspensão',
      objetivo: 'Entender qual regra foi supostamente violada',
      passos: [
        'Verifique seu e-mail cadastrado no Instagram',
        'Procure por notificação explicando o motivo da suspensão',
        'Acesse instagram.com e tente fazer login para ver mensagem de erro',
        'Anote a mensagem de erro exata que aparece'
      ],
      dica: 'Cheque também a pasta de spam do e-mail',
      responsavel: 'cliente' as const,
      tempo_estimado_minutos: 10,
      created_at: ''
    },
    {
      id: '5',
      playbook_id: 'PB_INSTAGRAM_SUSPENSAO',
      ordem: 2,
      titulo: 'Solicitar Revisão Oficial',
      objetivo: 'Usar o canal de recurso do Instagram',
      passos: [
        'Acesse: help.instagram.com',
        'Procure por "Minha conta foi desativada"',
        'Preencha o formulário de recurso com seus dados',
        'Seja objetivo e educado na justificativa',
        'Aguarde resposta em até 30 dias'
      ],
      responsavel: 'cliente' as const,
      tempo_estimado_minutos: 15,
      created_at: ''
    }
  ],
  PB_ML_NAO_ENTREGUE: [
    {
      id: '6',
      playbook_id: 'PB_ML_NAO_ENTREGUE',
      ordem: 1,
      titulo: 'Abrir Reclamação no Mercado Livre',
      objetivo: 'Usar o canal oficial de disputa da plataforma',
      passos: [
        'Acesse "Minhas compras" no Mercado Livre',
        'Encontre o pedido e clique em "Tenho um problema"',
        'Selecione: "Não recebi o produto"',
        'Descreva o ocorrido e anexe prints se necessário'
      ],
      dica: 'Faça isso ANTES do prazo de proteção expirar',
      responsavel: 'cliente' as const,
      tempo_estimado_minutos: 10,
      created_at: ''
    },
    {
      id: '7',
      playbook_id: 'PB_ML_NAO_ENTREGUE',
      ordem: 2,
      titulo: 'Escalar para Mediação do ML',
      objetivo: 'Pedir intervenção do Mercado Livre na disputa',
      passos: [
        'Aguarde o prazo dado ao vendedor para responder',
        'Se não resolver, clique em "Pedir ajuda ao Mercado Livre"',
        'Forneça todas as informações solicitadas',
        'Acompanhe o andamento da mediação'
      ],
      dica: 'O ML costuma decidir em favor do comprador com bom histórico',
      responsavel: 'cliente' as const,
      tempo_estimado_minutos: 10,
      created_at: ''
    }
  ]
};

export default function App() {
  const { view, setView, resultado, setResultado, setSteps, stepAtual, steps, completarStep, voltarStep, reset, respostas, setResposta } = useAppStore();

  // Handlers
  const handleStartWizard = () => setView('wizard');

  const handleWizardComplete = (respostasFinais: Record<string, string>) => {
    // Determinar playbook baseado nas respostas
    let playbookId = 'PB_PIX_FALSO_DEPOSITO';
    const alertas: string[] = [];
    let confianca = 85;

    if (respostasFinais.vertical === 'conta_problema') {
      playbookId = 'PB_INSTAGRAM_SUSPENSAO';
    } else if (respostasFinais.vertical === 'consumidor') {
      playbookId = 'PB_ML_NAO_ENTREGUE';
    }

    if (playbookId === 'PB_PIX_FALSO_DEPOSITO') {
      alertas.push('⏰ URGENTE: O MED só funciona em até 72 horas! Aja AGORA!');
      confianca = 95;
    }

    const playbook = PLAYBOOKS_LOCAL[playbookId as keyof typeof PLAYBOOKS_LOCAL];
    
    setResultado({
      playbook_id: playbookId,
      playbook,
      confianca,
      alertas
    });
    
    setView('resultado');
  };

  const handleIniciarFluxo = () => {
    if (resultado?.playbook_id) {
      const stepsDoPlaybook = STEPS_LOCAL[resultado.playbook_id as keyof typeof STEPS_LOCAL] || [];
      setSteps(stepsDoPlaybook);
      setView('fluxo');
    }
  };

  const handleRefazerDiagnostico = () => {
    reset();
    setView('wizard');
  };

  const handleVoltar = () => {
    setView('home');
    reset();
  };

  const handleContato = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Completei o diagnóstico no Fattori Digital e gostaria de falar com um advogado.', '_blank');
  };

  // Render baseado na view atual
  switch (view) {
    case 'home':
      return <HomeView onStart={handleStartWizard} />;
    
    case 'wizard':
      return (
        <WizardView 
          onComplete={handleWizardComplete}
          onCancel={handleVoltar}
          respostas={respostas}
          setResposta={setResposta}
        />
      );
    
    case 'resultado':
      return (
        <ResultadoView 
          resultado={resultado!}
          onIniciar={handleIniciarFluxo}
          onVoltar={handleRefazerDiagnostico}
        />
      );
    
    case 'fluxo':
      return (
        <FluxoView
          step={steps[stepAtual - 1]}
          stepAtual={stepAtual}
          totalSteps={steps.length}
          onComplete={() => completarStep(stepAtual)}
          onPrevious={voltarStep}
        />
      );
    
    case 'concluido':
      return (
        <ConcluidoView 
          onRestart={() => { reset(); setView('home'); }}
          onContato={handleContato}
        />
      );
    
    default:
      return <HomeView onStart={handleStartWizard} />;
  }
}
