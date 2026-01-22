// API Client para comunicação com o backend

const API_URL = import.meta.env.VITE_API_URL || '';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Playbooks
export const api = {
  // Health check
  health: () => fetchApi('/health'),
  
  // Playbooks
  getPlaybooks: () => fetchApi('/api/playbooks'),
  getPlaybook: (id: string) => fetchApi(`/api/playbooks/${id}`),
  getPlaybookSteps: (id: string) => fetchApi(`/api/playbooks/${id}/steps`),
  
  // Serviços
  getServicos: () => fetchApi('/api/servicos'),
  getServico: (id: string) => fetchApi(`/api/servicos/${id}`),
  
  // Diagnóstico
  processDiagnostico: (respostas: Record<string, string>) => 
    fetchApi('/api/diagnostico', {
      method: 'POST',
      body: JSON.stringify({ respostas })
    }),
  
  // Casos
  createCaso: (data: { playbook_id: string; email?: string; telefone?: string }) =>
    fetchApi('/api/casos', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  
  updateCasoProgresso: (id: string, data: { step_atual: number; steps_concluidos: number[] }) =>
    fetchApi(`/api/casos/${id}/progresso`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  
  // Checkout
  createCheckout: (data: { servico_id: string; caso_id?: string; email: string }) =>
    fetchApi('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

export default api;
