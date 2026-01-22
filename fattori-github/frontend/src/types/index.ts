// Tipos principais do sistema

export type Urgencia = 'emergencia' | 'alta' | 'normal';

export type Vertical = 
  | 'pix_fraudes' 
  | 'redes_sociais_acusado' 
  | 'redes_sociais_vitima' 
  | 'consumidor' 
  | 'plano_saude';

export type PerfilUsuario = 'VITIMA' | 'ACUSADO' | 'CONSUMIDOR';

export interface Playbook {
  id: string;
  titulo: string;
  descricao: string;
  vertical: Vertical;
  urgencia: Urgencia;
  perfil_usuario: PerfilUsuario;
  tempo_estimado_minutos: number;
  fundamento_legal: string;
  quando_usar: string[];
  servicos_relacionados: string[];
  palavras_chave: string[];
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface StepCard {
  id: string;
  playbook_id: string;
  ordem: number;
  titulo: string;
  objetivo: string;
  passos: string[];
  dica?: string;
  alerta?: string;
  responsavel: 'cliente' | 'fattori' | 'ambos';
  tempo_estimado_minutos: number;
  documentos_necessarios?: string[];
  links_uteis?: { titulo: string; url: string }[];
  created_at: string;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco_centavos: number;
  categoria: 'documento' | 'consultoria' | 'representacao';
  tempo_entrega_horas: number;
  inclui: string[];
  ativo: boolean;
}

export interface ResultadoDiagnostico {
  playbook_id: string;
  playbook: Playbook;
  confianca: number;
  alertas: string[];
}

export interface RespostasWizard {
  vertical?: string;
  detalhe?: string;
  urgencia?: string;
  perfil?: string;
  [key: string]: string | undefined;
}

export interface CasoUsuario {
  id: string;
  playbook_id: string;
  respostas_wizard: RespostasWizard;
  email?: string;
  telefone?: string;
  status: 'diagnostico_completo' | 'em_andamento' | 'concluido' | 'aguardando_pagamento';
  step_atual: number;
  steps_completos: number[];
  created_at: string;
  updated_at: string;
}

// Estado da aplicação
export interface AppState {
  // View atual
  view: 'home' | 'wizard' | 'resultado' | 'fluxo' | 'checkout' | 'concluido';
  
  // Wizard
  wizardStep: number;
  respostas: RespostasWizard;
  
  // Resultado
  resultado: ResultadoDiagnostico | null;
  
  // Fluxo de resolução
  playbook: Playbook | null;
  steps: StepCard[];
  stepAtual: number;
  stepsCompletos: number[];
  
  // Caso do usuário
  caso: CasoUsuario | null;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

// Perguntas do Wizard
export interface OpcaoWizard {
  value: string;
  label: string;
  icon?: string;
}

export interface PerguntaWizard {
  id: string;
  texto: string;
  opcoes: OpcaoWizard[];
  condicao?: (respostas: RespostasWizard) => boolean;
}
