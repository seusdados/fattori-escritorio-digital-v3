import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { RespostasWizard } from '../types';

interface WizardViewProps {
  onComplete: (respostas: Record<string, string>) => void;
  onCancel: () => void;
  respostas: RespostasWizard;
  setResposta: (key: string, value: string) => void;
}

const PERGUNTAS = [
  {
    id: 'vertical',
    texto: 'Qual tipo de problema você está enfrentando?',
    opcoes: [
      { value: 'golpe_pix', label: '🚨 Golpe envolvendo PIX ou transferência' },
      { value: 'conta_problema', label: '🔒 Conta de rede social suspensa ou hackeada' },
      { value: 'consumidor', label: '🛒 Problema com compra online' },
      { value: 'plano_saude', label: '🏥 Plano de saúde negou atendimento' }
    ]
  },
  {
    id: 'urgencia',
    texto: 'Qual a urgência da situação?',
    opcoes: [
      { value: 'emergencia', label: '⚡ Emergência - Aconteceu nas últimas 72 horas' },
      { value: 'alta', label: '⏰ Urgente - Preciso resolver esta semana' },
      { value: 'normal', label: '📋 Normal - Quero entender meus direitos' }
    ]
  }
];

export function WizardView({ onComplete, onCancel, respostas, setResposta }: WizardViewProps) {
  const [step, setStep] = useState(0);

  const handleResposta = (valor: string) => {
    const perguntaAtual = PERGUNTAS[step];
    setResposta(perguntaAtual.id, valor);
    
    const novasRespostas = { ...respostas, [perguntaAtual.id]: valor };

    if (step < PERGUNTAS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(novasRespostas as Record<string, string>);
    }
  };

  const pergunta = PERGUNTAS[step];
  const progress = ((step + 1) / PERGUNTAS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl animate-fadeIn">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Diagnóstico</span>
            <span className="text-cyan-400 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
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
                className="w-full bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-blue-500 rounded-xl p-4 text-left text-white transition-all group"
              >
                <span className="text-lg group-hover:translate-x-1 inline-block transition-transform">
                  {opcao.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Back button */}
        <div className="mt-6 flex justify-center gap-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-slate-400 hover:text-slate-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          )}
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-400 flex items-center gap-2 px-4 py-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
