// Tipos principais do sistema Fattori V3

export type PerfilUsuario = 'VITIMA' | 'ACUSADO' | 'CONSUMIDOR';
export type Urgencia = 'emergencia' | 'alta' | 'normal' | 'baixa';
export type Vertical = 'pix' | 'redes_sociais' | 'consumidor' | 'saude';

export interface Playbook {
  id: string;
  titulo: string;
  descricao: string;
  vertical: Vertical;
  perfil_usuario: PerfilUsuario;
  urgencia: Urgencia;
  tempo_estimado_minutos: number;
  fundamento_legal: string;
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
  responsavel: 'cliente' | 'fattori' | 'ambos';
  tempo_estimado_minutos: number;
  documentos_necessarios?: string[];
  links_uteis?: { titulo: string; url: string }[];
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco_centavos: number;
  tipo: 'documento' | 'consultoria' | 'pacote';
  inclui: string[];
  prazo_entrega_horas: number;
  ativo: boolean;
}

export interface DiagnosticoRespostas {
  vertical?: string;
  perfil?: string;
  urgencia?: string;
  detalhes?: string;
  [key: string]: string | undefined;
}

export interface DiagnosticoResultado {
  playbook: Playbook;
  playbook_id: string;
  steps: StepCard[];
  confianca: number;
  alertas: string[];
}

export interface CasoUsuario {
  id: string;
  playbook_id: string;
  email?: string;
  telefone?: string;
  dados_caso: Record<string, any>;
  status: 'em_andamento' | 'concluido' | 'aguardando_pagamento';
  step_atual: number;
  steps_concluidos: number[];
  created_at: string;
  updated_at: string;
}

export type ViewType = 'home' | 'wizard' | 'resultado' | 'fluxo' | 'checkout' | 'concluido';

export interface AppState {
  view: ViewType;
  resultado: DiagnosticoResultado | null;
  steps: StepCard[];
  stepAtual: number;
  caso: CasoUsuario | null;
}
