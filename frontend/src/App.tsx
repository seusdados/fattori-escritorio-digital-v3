import { useAppStore } from './stores/appStore';
import { HomeView, WizardView, ResultadoView, StepView, ConcluidoView } from './views';
import type { DiagnosticoResultado } from './types';

function App() {
  const { 
    view, 
    resultado, 
    steps, 
    stepAtual,
    setView,
    setResultado,
    iniciarFluxo,
    completarStep,
    voltarStep,
    reiniciar
  } = useAppStore();

  const handleCompletarWizard = (res: DiagnosticoResultado) => {
    setResultado(res);
  };

  switch (view) {
    case 'home':
      return <HomeView onStart={() => setView('wizard')} />;
    
    case 'wizard':
      return (
        <WizardView 
          onComplete={handleCompletarWizard} 
          onCancel={reiniciar} 
        />
      );
    
    case 'resultado':
      if (!resultado) {
        reiniciar();
        return null;
      }
      return (
        <ResultadoView 
          resultado={resultado} 
          onIniciar={iniciarFluxo} 
          onVoltar={() => setView('wizard')} 
        />
      );
    
    case 'fluxo':
      if (!steps.length || !steps[stepAtual - 1]) {
        reiniciar();
        return null;
      }
      return (
        <StepView 
          step={steps[stepAtual - 1]} 
          stepAtual={stepAtual} 
          totalSteps={steps.length}
          onComplete={completarStep}
          onPrevious={voltarStep}
        />
      );
    
    case 'concluido':
      return <ConcluidoView onRestart={reiniciar} />;
    
    default:
      return <HomeView onStart={() => setView('wizard')} />;
  }
}

export default App;
