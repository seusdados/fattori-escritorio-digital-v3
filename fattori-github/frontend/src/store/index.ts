import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, RespostasWizard, ResultadoDiagnostico, StepCard, Playbook } from '../types';

interface AppStore extends AppState {
  // Actions - Navigation
  setView: (view: AppState['view']) => void;
  
  // Actions - Wizard
  setWizardStep: (step: number) => void;
  setResposta: (key: string, value: string) => void;
  resetWizard: () => void;
  
  // Actions - Resultado
  setResultado: (resultado: ResultadoDiagnostico) => void;
  
  // Actions - Fluxo
  setPlaybook: (playbook: Playbook) => void;
  setSteps: (steps: StepCard[]) => void;
  setStepAtual: (step: number) => void;
  completarStep: (stepOrdem: number) => void;
  voltarStep: () => void;
  
  // Actions - Loading
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Actions - Reset
  reset: () => void;
}

const initialState: AppState = {
  view: 'home',
  wizardStep: 0,
  respostas: {},
  resultado: null,
  playbook: null,
  steps: [],
  stepAtual: 1,
  stepsCompletos: [],
  caso: null,
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation
      setView: (view) => set({ view }),

      // Wizard
      setWizardStep: (wizardStep) => set({ wizardStep }),
      
      setResposta: (key, value) => set((state) => ({
        respostas: { ...state.respostas, [key]: value }
      })),
      
      resetWizard: () => set({
        wizardStep: 0,
        respostas: {},
        resultado: null,
      }),

      // Resultado
      setResultado: (resultado) => set({ resultado }),

      // Fluxo
      setPlaybook: (playbook) => set({ playbook }),
      
      setSteps: (steps) => set({ steps }),
      
      setStepAtual: (stepAtual) => set({ stepAtual }),
      
      completarStep: (stepOrdem) => {
        const { stepsCompletos, steps, stepAtual } = get();
        const novosCompletos = [...new Set([...stepsCompletos, stepOrdem])];
        
        if (stepAtual >= steps.length) {
          set({ 
            stepsCompletos: novosCompletos,
            view: 'concluido'
          });
        } else {
          set({ 
            stepsCompletos: novosCompletos,
            stepAtual: stepAtual + 1
          });
        }
      },
      
      voltarStep: () => {
        const { stepAtual } = get();
        if (stepAtual > 1) {
          set({ stepAtual: stepAtual - 1 });
        }
      },

      // Loading
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'fattori-v3-store',
      partialize: (state) => ({
        respostas: state.respostas,
        stepsCompletos: state.stepsCompletos,
        stepAtual: state.stepAtual,
      }),
    }
  )
);
