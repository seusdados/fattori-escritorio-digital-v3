import { Shield, Zap, FileText, Phone, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  onStart: () => void;
}

export function HomeView({ onStart }: HomeViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl animate-fadeIn">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-4 shadow-lg shadow-blue-500/25">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Fattori Advogados
          </h1>
          <p className="text-slate-400 text-lg mt-2">Escritório Digital</p>
        </div>

        {/* Proposta de valor */}
        <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto">
          Resolva problemas jurídicos digitais com roteiros passo-a-passo criados por advogados especializados
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-colors">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-white font-semibold">Diagnóstico em 2min</div>
            <div className="text-slate-400 text-sm">100% gratuito</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-colors">
            <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-white font-semibold">Roteiros Detalhados</div>
            <div className="text-slate-400 text-sm">Passo a passo</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-blue-500/50 transition-colors">
            <Phone className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-white font-semibold">Suporte Jurídico</div>
            <div className="text-slate-400 text-sm">Advogados reais</div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
        >
          Iniciar Diagnóstico Gratuito
          <ChevronRight className="w-5 h-5" />
        </button>

        <p className="text-slate-500 text-sm mt-4">
          Sem cadastro • Sem compromisso • Resultado imediato
        </p>

        {/* Verticais atendidas */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4">Áreas de atuação:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Golpes PIX', 'Redes Sociais', 'Compras Online', 'Plano de Saúde'].map((area) => (
              <span key={area} className="bg-slate-800/50 text-slate-400 text-sm px-3 py-1 rounded-full border border-slate-700">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
