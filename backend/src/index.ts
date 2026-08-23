import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { users, duels, generateId } from './db';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy' });

// Wrappers for consistent responses
const sendSuccess = (res: express.Response, data: any, status = 200) => {
  res.status(status).json({ success: true, data });
};

const sendError = (res: express.Response, message: string, status = 400, code = 'ERROR') => {
  res.status(status).json({ success: false, error: { message, code } });
};

// --- HEALTH ---
app.get('/health', (_req, res) => sendSuccess(res, { service: 'aqlzor-api', status: 'ok', version: 'mvp-2' }));

// --- USERS ---
app.post('/api/users/register', (req, res) => {
  const { name, schoolId, classId } = req.body;
  if (!name || !schoolId || !classId) {
    return sendError(res, 'Missing required fields', 400, 'MISSING_FIELDS');
  }
  const id = generateId();
  const newUser = { id, name, schoolId, classId, xp: 0, level: 1, streak: 0, badges: [], stats: {} };
  users.set(id, newUser);
  sendSuccess(res, newUser, 201);
});

app.post('/api/auth/login', (req, res) => {
  const { name, schoolId, classId } = req.body;
  if (!name || !schoolId || !classId) return sendError(res, 'Name, schoolId and classId are required', 400, 'MISSING_FIELDS');
  const normalized = String(name).trim().toLowerCase();
  const user = Array.from(users.values()).find((candidate) => candidate.name.toLowerCase() === normalized && candidate.schoolId === schoolId && candidate.classId === classId);
  if (!user) return sendError(res, 'Profile not found. Register first.', 404, 'INVALID_CREDENTIALS');
  sendSuccess(res, { user, token: `mvp-${user.id}` });
});

app.get('/api/users', (req, res) => {
  let allUsers = Array.from(users.values());
  const { schoolId, className } = req.query;
  
  if (schoolId) {
    allUsers = allUsers.filter(u => u.schoolId === schoolId);
  }
  if (className) {
    // Note: our db uses classId
    allUsers = allUsers.filter(u => u.classId === className);
  }
  
  sendSuccess(res, allUsers);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return sendError(res, 'User not found', 404, 'NOT_FOUND');
  sendSuccess(res, user);
});

app.patch('/api/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return sendError(res, 'User not found', 404, 'NOT_FOUND');
  const updatedUser = { ...user, ...req.body };
  users.set(req.params.id, updatedUser);
  sendSuccess(res, updatedUser);
});

app.delete('/api/users/:id', (req, res) => {
  if (!users.has(req.params.id)) return sendError(res, 'User not found', 404, 'NOT_FOUND');
  users.delete(req.params.id);
  res.status(204).send(); // Standard DELETE response is empty 204
});

// --- AI HELPER ---
const askGemini = async (prompt: string, mockResponse: string) => {
  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      if (response.text) return response.text;
    } catch (e) {
      console.error('Gemini error, falling back to mock:', e);
    }
  }
  return mockResponse;
};

// --- AI ENDPOINTS ---
app.post('/api/ai/ask', async (req, res) => {
  const { question } = req.body;
  if (!question) return sendError(res, 'Missing question', 400, 'MISSING_FIELDS');
  const fallback = `[Mock AI Response] This is a deterministic demo response for: ${question}`;
  const answer = await askGemini(`Answer this concisely: ${question}`, fallback);
  sendSuccess(res, { answer });
});

app.post('/api/ai/explain-fun', async (req, res) => {
  const { topic } = req.body;
  const fallback = `[Mock Fun AI] Here is a fun explanation about ${topic || 'nothing'}: It's like magic, but with math!`;
  const explanation = await askGemini(`Explain ${topic || 'something random'} in a fun, engaging way for a student.`, fallback);
  sendSuccess(res, { explanation });
});

app.post('/api/ai/solve-image', async (req, res) => {
  // Mocking the image part since it's a bit complex for a hackathon MVP
  const fallback = `[Mock Image AI] I see a math problem in this image. The answer is 42.`;
  const solution = await askGemini(`Solve the generic math problem hidden in this imaginary image. Be creative.`, fallback);
  sendSuccess(res, { solution });
});

// --- DUEL ---
app.post('/api/duel/create', (req, res) => {
  const { subject, playerId } = req.body;
  if (!subject || !playerId) return sendError(res, 'Missing fields', 400, 'MISSING_FIELDS');
  const id = generateId();
  const duel = {
    id,
    subject,
    player1Id: playerId,
    status: 'waiting' as const,
    questions: [
      { q: 'What is 2+2?', a: '4' },
      { q: 'What is the capital of France?', a: 'Paris' }
    ],
    p1Score: 0,
    p2Score: 0
  };
  duels.set(id, duel);
  sendSuccess(res, duel, 201);
});

app.post('/api/duel/:id/join', (req, res) => {
  const { playerId } = req.body;
  const duel = duels.get(req.params.id);
  if (!duel) return sendError(res, 'Duel not found', 404, 'NOT_FOUND');
  if (duel.status !== 'waiting') return sendError(res, 'Duel not available', 400, 'INVALID_STATE');
  
  duel.player2Id = playerId;
  duel.status = 'active';
  sendSuccess(res, duel);
});

app.post('/api/duel/:id/answer', (req, res) => {
  const { playerId, answer, questionIndex, responseTimeMs } = req.body;
  const duel = duels.get(req.params.id);
  if (!duel) return sendError(res, 'Duel not found', 404, 'NOT_FOUND');
  if (duel.status !== 'active') return sendError(res, 'Duel is not active', 400, 'INVALID_STATE');
  
  const isCorrect = answer === duel.questions[questionIndex]?.a;
  if (isCorrect) {
    if (playerId === duel.player1Id) duel.p1Score++;
    else if (playerId === duel.player2Id) duel.p2Score++;
  }
  
  const timeTaken = responseTimeMs || Math.floor(Math.random() * 5000) + 1000;
  
  const totalCorrect = duel.p1Score + duel.p2Score;
  if (totalCorrect >= duel.questions.length) {
    duel.status = 'completed';
    if (duel.p1Score > duel.p2Score) duel.winnerId = duel.player1Id;
    else if (duel.p2Score > duel.p1Score) duel.winnerId = duel.player2Id;
    else duel.winnerId = 'tie';
  }
  
  sendSuccess(res, { correct: isCorrect, timeTaken, duel });
});

app.get('/api/duel/:id/result', (req, res) => {
  const duel = duels.get(req.params.id);
  if (!duel) return sendError(res, 'Duel not found', 404, 'NOT_FOUND');
  sendSuccess(res, {
    winnerId: duel.winnerId,
    p1Score: duel.p1Score,
    p2Score: duel.p2Score
  });
});

// --- LEADERBOARD ---
app.get('/api/leaderboard/:schoolId', (req, res) => {
  const schoolId = req.params.schoolId;
  const schoolUsers = Array.from(users.values()).filter(u => u.schoolId === schoolId);
  schoolUsers.sort((a, b) => b.xp - a.xp);
  sendSuccess(res, schoolUsers);
});

// --- QUIZ ---
app.post('/api/quiz/generate', async (req, res) => {
  const { subject } = req.body;
  
  const fallback = [
    { question: `What is a core concept of ${subject || 'this subject'}?`, options: ['A', 'B', 'C', 'D'], answer: 'A' },
    { question: `Who invented ${subject || 'this'}?`, options: ['Alice', 'Bob', 'Charlie', 'Dave'], answer: 'Bob' },
    { question: `When was ${subject || 'it'} discovered?`, options: ['1990', '1995', '2000', '2005'], answer: '2000' },
    { question: `Which of these is not related to ${subject || 'this'}?`, options: ['Option X', 'Option Y', 'Option Z', 'Option W'], answer: 'Option Z' },
    { question: `What is the future of ${subject || 'this field'}?`, options: ['Unknown', 'Bright', 'Limited', 'Explosive'], answer: 'Bright' }
  ];

  if (process.env.GEMINI_API_KEY) {
    try {
      const prompt = `Generate exactly 5 multiple choice questions about ${subject || 'general knowledge'}. 
Return valid JSON matching this schema: [{ "question": "string", "options": ["string", "string", "string", "string"], "answer": "string" }]. Do not include markdown or other text.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      if (response.text) {
        // Strip out potential markdown block for JSON
        const rawText = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(rawText);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sendSuccess(res, { subject, questions: parsed });
        }
      }
    } catch (e) {
      console.error('Gemini error generating quiz, falling back to mock:', e);
    }
  }

  sendSuccess(res, { subject, questions: fallback });
});

// --- DOWNLOADS ---
app.get('/downloads/aqlzor.apk', (_req, res) => {
  const apkUrl = process.env.APK_URL;
  if (!apkUrl) return sendError(res, 'APK is not configured yet. Set APK_URL in Render.', 503, 'APK_NOT_CONFIGURED');
  return res.redirect(302, apkUrl);
});

// --- GLOBAL ERROR HANDLING ---
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  sendError(res, 'Internal Server Error', 500, 'INTERNAL_ERROR');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
