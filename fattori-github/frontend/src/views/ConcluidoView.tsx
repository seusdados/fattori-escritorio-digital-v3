import { CheckCircle, Phone, RotateCcw, FileText, MessageCircle } from 'lucide-react';

interface ConcluidoViewProps {
  onRestart: () => void;
  onContato: () => void;
}

export function ConcluidoView({ onRestart, onContato }: ConcluidoViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md text-center animate-fadeIn">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <CheckCircle className="w-12 h-12 text-green-400" />
        </div>

        <h1 className="text-3xl font-bold text-green-400 mb-2">Parabéns!</h1>
        <p className="text-slate-400 mb-8">
          Você completou todos os passos do roteiro de resolução.
        </p>

        {/* Next Steps Card */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6 text-left">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Próximos passos
          </h3>
          
          <ul className="space-y-3 text-slate-300 text-sm mb-6">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Guarde todos os protocolos e comprovantes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Acompanhe os prazos das solicitações</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Entre em contato conosco se precisar de suporte adicional</span>
            </li>
          </ul>

          <div className="border-t border-slate-700 pt-4">
            <p className="text-slate-400 text-sm mb-4">
              Precisa de mais ajuda? Nossa equipe jurídica pode auxiliar com documentos, petições e acompanhamento do caso.
            </p>
            
            <button
              onClick={onContato}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com Advogado
            </button>
          </div>
        </div>

        {/* Services Teaser */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
          <p className="text-blue-300 text-sm">
            💼 Serviços disponíveis: Notificação Extrajudicial, Petição Inicial, Acompanhamento Completo
          </p>
        </div>

        {/* Restart */}
        <button
          onClick={onRestart}
          className="text-slate-500 hover:text-slate-400 flex items-center gap-2 mx-auto transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Novo diagnóstico
        </button>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          <p className="text-slate-600 text-xs">
            Fattori Advogados © 2026 • OAB/SP 123.456
          </p>
        </div>
      </div>
    </div>
  );
}
