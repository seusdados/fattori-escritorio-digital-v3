import { Target, FileText, CheckCircle, ArrowLeft, AlertTriangle, ExternalLink } from 'lucide-react';
import type { StepCard } from '../types';

interface FluxoViewProps {
  step: StepCard;
  stepAtual: number;
  totalSteps: number;
  onComplete: () => void;
  onPrevious: () => void;
}

export function FluxoView({ step, stepAtual, totalSteps, onComplete, onPrevious }: FluxoViewProps) {
  const progress = (stepAtual / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl animate-fadeIn">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">
              Passo <span className="text-white font-semibold">{stepAtual}</span> de {totalSteps}
            </span>
            <span className="text-cyan-400 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Card */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          {/* Step Number Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 text-xl font-bold mb-4 border border-blue-500/30">
            {stepAtual}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-4">{step.titulo}</h2>

          {/* Alert (if exists) */}
          {step.alerta && (
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <span className="text-orange-300 text-sm">{step.alerta}</span>
            </div>
          )}

          {/* Objective */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 mb-6 border border-blue-500/20">
            <div className="flex items-center gap-2 text-cyan-400 font-medium mb-2">
              <Target className="w-4 h-4" />
              Objetivo
            </div>
            <p className="text-white">{step.objetivo}</p>
          </div>

          {/* Steps List */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white font-semibold mb-4">
              <FileText className="w-4 h-4 text-blue-400" />
              Como fazer:
            </div>
            <ol className="space-y-3">
              {step.passos.map((passo, i) => (
                <li key={i} className="flex gap-3 text-slate-300 group">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 text-slate-400 text-sm flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{passo}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tip */}
          {step.dica && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-xl">💡</span>
                <div>
                  <span className="text-yellow-400 font-medium text-sm">Dica: </span>
                  <span className="text-yellow-200/80 text-sm">{step.dica}</span>
                </div>
              </div>
            </div>
          )}

          {/* Useful Links */}
          {step.links_uteis && step.links_uteis.length > 0 && (
            <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
              <div className="text-slate-400 text-sm font-medium mb-3">Links úteis:</div>
              <div className="space-y-2">
                {step.links_uteis.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {link.titulo}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Time Estimate */}
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
            <span>⏱️</span>
            <span>Tempo estimado: {step.tempo_estimado_minutos} minutos</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onComplete}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              {stepAtual === totalSteps ? 'Finalizar' : 'Concluí este passo'}
            </button>
            {stepAtual > 1 && (
              <button
                onClick={onPrevious}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-4 px-4 rounded-xl transition-colors"
                title="Voltar ao passo anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i + 1 === stepAtual
                  ? 'w-6 bg-blue-500'
                  : i + 1 < stepAtual
                  ? 'bg-green-500'
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
