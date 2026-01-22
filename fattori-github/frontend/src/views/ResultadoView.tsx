import { AlertTriangle, Clock, ChevronRight, RotateCcw, Scale } from 'lucide-react';
import type { ResultadoDiagnostico } from '../types';

interface ResultadoViewProps {
  resultado: ResultadoDiagnostico;
  onIniciar: () => void;
  onVoltar: () => void;
}

const urgenciaConfig = {
  emergencia: { 
    color: 'text-orange-400', 
    bg: 'bg-orange-500/10', 
    border: 'border-orange-500/30', 
    label: 'EMERGÊNCIA',
    icon: '🚨'
  },
  alta: { 
    color: 'text-yellow-400', 
    bg: 'bg-yellow-500/10', 
    border: 'border-yellow-500/30', 
    label: 'URGENTE',
    icon: '⚡'
  },
  normal: { 
    color: 'text-slate-400', 
    bg: 'bg-slate-500/10', 
    border: 'border-slate-500/30', 
    label: 'NORMAL',
    icon: '📋'
  }
};

export function ResultadoView({ resultado, onIniciar, onVoltar }: ResultadoViewProps) {
  const { playbook, confianca, alertas } = resultado;
  const config = urgenciaConfig[playbook.urgencia];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Diagnóstico Concluído</h1>
          <p className="text-slate-400">Identificamos o melhor roteiro para o seu caso</p>
        </div>

        {/* Result Card */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          {/* Badge de urgência */}
          <div className={`inline-flex items-center gap-2 ${config.bg} ${config.color} ${config.border} border px-3 py-1.5 rounded-full text-xs font-bold mb-4`}>
            <span>{config.icon}</span>
            {config.label}
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold text-white mb-2">{playbook.titulo}</h2>
          <p className="text-slate-400 mb-4">{playbook.descricao}</p>

          {/* Alertas */}
          {alertas?.map((alerta, i) => (
            <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 mb-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{alerta}</span>
            </div>
          ))}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700/30 rounded-xl p-4 text-center">
              <Clock className="w-5 h-5 text-slate-400 mx-auto mb-2" />
              <div className="text-white font-semibold">{playbook.tempo_estimado_minutos} min</div>
              <div className="text-slate-500 text-xs">Tempo estimado</div>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-cyan-400 font-semibold">{confianca}%</div>
              <div className="text-slate-500 text-xs">Confiança</div>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">📋</div>
              <div className="text-white font-semibold">3</div>
              <div className="text-slate-500 text-xs">Passos</div>
            </div>
          </div>

          {/* Fundamento Legal */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-2">
              <Scale className="w-4 h-4" />
              Fundamento Legal
            </div>
            <p className="text-slate-300 text-sm">{playbook.fundamento_legal}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onIniciar}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              Iniciar Resolução
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onVoltar}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-4 px-4 rounded-xl transition-colors"
              title="Refazer diagnóstico"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-slate-500 text-xs text-center mt-4 max-w-md mx-auto">
          Este roteiro foi criado por advogados especializados. Em casos complexos, recomendamos consultar um profissional.
        </p>
      </div>
    </div>
  );
}
