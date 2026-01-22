import { CheckCircle, Phone, RotateCcw, MessageCircle } from 'lucide-react';

interface ConcluidoViewProps {
  onRestart: () => void;
}

export function ConcluidoView({ onRestart }: ConcluidoViewProps) {
  const handleContato = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Completei o diagnóstico no Fattori Digital e gostaria de falar com um advogado.', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md text-center animate-fade-in">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold text-green-400 mb-2">Parabéns!</h1>
        <p className="text-slate-400 mb-8">
          Você completou todos os passos do roteiro de resolução.
        </p>

        {/* Next Steps */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6 text-left">
          <h3 className="text-white font-semibold mb-4">Precisa de mais ajuda?</h3>
          <p className="text-slate-400 text-sm mb-4">
            Nossa equipe jurídica pode te ajudar com documentos, petições e acompanhamento do caso.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleContato}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp - Falar com Advogado
            </button>
            
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            >
              <Phone className="w-5 h-5" />
              Agendar Teleatendimento - R$ 199
            </button>
          </div>
        </div>

        {/* Services Preview */}
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-6">
          <h4 className="text-slate-300 font-medium mb-3">Serviços Disponíveis</h4>
          <div className="space-y-2 text-left text-sm">
            <div className="flex justify-between text-slate-400">
              <span>📄 Notificação Extrajudicial</span>
              <span className="text-cyan-400">R$ 49,90</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>📋 Petição Completa</span>
              <span className="text-cyan-400">R$ 199,90</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>🎯 Pacote Resolução Total</span>
              <span className="text-cyan-400">R$ 399,90</span>
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="text-slate-500 hover:text-slate-400 flex items-center gap-2 mx-auto transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Novo diagnóstico
        </button>
      </div>
    </div>
  );
}
