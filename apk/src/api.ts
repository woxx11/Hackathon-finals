const API_BASE_URL = 'https://hackathon-finals-0rjs.onrender.com';

export type ApiResponse<T> = { success: true; data: T } | { success: false; error: { message: string; code: string } };

export type User = {
  id: string;
  name: string;
  schoolId: string;
  classId: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  stats: Record<string, unknown>;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type Duel = {
  id: string;
  subject: string;
  player1Id: string;
  player2Id?: string;
  status: 'waiting' | 'active' | 'completed';
  questions: { q: string; a: string }[];
  p1Score: number;
  p2Score: number;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const payload = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.success ? `Request failed (${response.status})` : payload.error.message);
  }
  return payload.data;
}

export const api = {
  login: (name: string, schoolId: string, classId: string) => request<{ user: User; token: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ name, schoolId, classId }) }),
  ask: (question: string) => request<{ answer: string }>('/api/ai/ask', { method: 'POST', body: JSON.stringify({ question }) }),
  generateQuiz: (subject: string) => request<{ subject: string; questions: QuizQuestion[] }>('/api/quiz/generate', { method: 'POST', body: JSON.stringify({ subject }) }),
  register: (name: string, schoolId: string, classId: string) => request<User>('/api/users/register', { method: 'POST', body: JSON.stringify({ name, schoolId, classId }) }),
  leaderboard: (schoolId: string) => request<User[]>(`/api/leaderboard/${encodeURIComponent(schoolId)}`),
  createDuel: (subject: string, playerId: string) => request<Duel>('/api/duel/create', { method: 'POST', body: JSON.stringify({ subject, playerId }) }),
};

export const APK_DOWNLOAD_URL = `${API_BASE_URL}/downloads/aqlzor.apk`;

export { API_BASE_URL };
