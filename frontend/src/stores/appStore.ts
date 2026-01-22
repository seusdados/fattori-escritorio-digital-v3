import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, DiagnosticoResultado, StepCard, ViewType } from '../types';

interface AppStore extends AppState {
  // Actions
  setView: (view: ViewType) => void;
  setResultado: (resultado: DiagnosticoResultado) => void;
  iniciarFluxo: () => void;
  completarStep: () => void;
  voltarStep: () => void;
  reiniciar: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      view: 'home',
      resultado: null,
      steps: [],
      stepAtual: 1,
      caso: null,

      // Actions
      setView: (view) => set({ view }),

      setResultado: (resultado) => set({ 
        resultado, 
        view: 'resultado',
        steps: resultado.steps 
      }),

      iniciarFluxo: () => {
        const { resultado } = get();
        if (resultado) {
          set({ 
            view: 'fluxo', 
            steps: resultado.steps,
            stepAtual: 1 
          });
        }
      },

      completarStep: () => {
        const { stepAtual, steps } = get();
        if (stepAtual >= steps.length) {
          set({ view: 'concluido' });
        } else {
          set({ stepAtual: stepAtual + 1 });
        }
      },

      voltarStep: () => {
        const { stepAtual } = get();
        if (stepAtual > 1) {
          set({ stepAtual: stepAtual - 1 });
        }
      },

      reiniciar: () => set({
        view: 'home',
        resultado: null,
        steps: [],
        stepAtual: 1,
        caso: null
      })
    }),
    {
      name: 'fattori-v3-storage',
      partialize: (state) => ({
        resultado: state.resultado,
        stepAtual: state.stepAtual,
        caso: state.caso
      })
    }
  )
);
