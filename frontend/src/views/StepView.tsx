import { ArrowLeft, CheckCircle, Target, FileText, Lightbulb } from 'lucide-react';
import type { StepCard } from '../types';

interface StepViewProps {
  step: StepCard;
  stepAtual: number;
  totalSteps: number;
  onComplete: () => void;
  onPrevious: () => void;
}

export function StepView({ step, stepAtual, totalSteps, onComplete, onPrevious }: StepViewProps) {
  const progress = (stepAtual / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-400">Passo {stepAtual} de {totalSteps}</span>
          <span className="text-cyan-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Card */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          {/* Step Number */}
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 font-bold mb-4">
            {stepAtual}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-4">{step.titulo}</h2>

          {/* Objective */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 mb-6 border border-blue-500/20">
            <div className="flex items-center gap-2 text-cyan-400 font-medium mb-1">
              <Target className="w-4 h-4" />
              Objetivo
            </div>
            <p className="text-white">{step.objetivo}</p>
          </div>

          {/* Steps */}
          <div className="mb-6">
            <div className="text-white font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              Como fazer:
            </div>
            <ol className="space-y-3">
              {step.passos.map((passo, i) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 text-slate-400 text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{passo}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tip */}
          {step.dica && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-6 flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-yellow-300 text-sm">{step.dica}</div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onComplete}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              Concluí este passo
            </button>
            {stepAtual > 1 && (
              <button
                onClick={onPrevious}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 px-4 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
