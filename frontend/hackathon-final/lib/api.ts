const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.error?.message || "API xatosi");
    }
    
    return payload.data;
  } catch (error: any) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw new Error(error.message || "Server bilan bog'lanishda xatolik");
  }
}

export const api = {
  // Auth & Profile
  login: (data: { name: string; schoolId: string; classId: string }) => fetchApi("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data: { name: string; schoolId: string; classId: string }) => fetchApi("/api/users/register", { method: "POST", body: JSON.stringify(data) }),
  getUser: (id: string) => fetchApi(`/api/users/${id}`),
  
  // Leaderboard
  getLeaderboard: (schoolId: string) => fetchApi(`/api/leaderboard/${schoolId}`),
  
  // Duel
  createDuel: (subject: string, playerId: string) => fetchApi("/api/duel/create", { method: "POST", body: JSON.stringify({ subject, playerId }) }),
  joinDuel: (duelId: string, playerId: string) => fetchApi(`/api/duel/${duelId}/join`, { method: "POST", body: JSON.stringify({ playerId }) }),
  submitAnswer: (duelId: string, data: any) => fetchApi(`/api/duel/${duelId}/answer`, { method: "POST", body: JSON.stringify(data) }),
  getDuelResult: (duelId: string) => fetchApi(`/api/duel/${duelId}/result`),
  
  // AI
  askAI: (question: string, context?: any) => fetchApi("/api/ai/ask", { method: "POST", body: JSON.stringify({ question, context }) }),
  explainFun: (topic: string, context?: any) => fetchApi("/api/ai/explain-fun", { method: "POST", body: JSON.stringify({ topic, context }) }),
  
  // Quiz
  generateQuiz: (subject: string) => fetchApi("/api/quiz/generate", { method: "POST", body: JSON.stringify({ subject }) }),
};
