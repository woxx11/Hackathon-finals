const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface ApiSuccess<T> {
  success: true;
  data: T;
}

interface ApiFailure {
  success: false;
  error: { message: string; code: string };
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as ApiSuccess<T> | ApiFailure;
  if (!json.success) throw new Error(json.error.message);
  return json.data;
}

export async function askAI(question: string, subject?: string): Promise<string> {
  const { answer } = await post<{ answer: string }>("/api/ai/ask", { question, subject });
  return answer;
}
