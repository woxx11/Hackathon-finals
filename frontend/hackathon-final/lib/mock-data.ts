import type {
  Badge,
  ChatMessage,
  Duel,
  DuelResult,
  LeaderboardEntry,
  QuizQuestion,
  SolveResult,
  SubjectMeta,
  User,
} from "./types";

export const SUBJECTS: SubjectMeta[] = [
  { id: "math", label: "Matematika", icon: "Sigma", color: "var(--color-subj-math)", glow: "rgba(91,141,239,0.35)" },
  { id: "physics", label: "Fizika", icon: "Atom", color: "var(--color-subj-physics)", glow: "rgba(155,123,255,0.35)" },
  { id: "language", label: "Ona tili", icon: "BookOpen", color: "var(--color-subj-lang)", glow: "rgba(88,196,138,0.35)" },
  { id: "chemistry", label: "Kimyo", icon: "FlaskConical", color: "var(--color-subj-chem)", glow: "rgba(242,166,90,0.35)" },
  { id: "history", label: "Tarix", icon: "Landmark", color: "var(--color-subj-history)", glow: "rgba(229,117,122,0.35)" },
  { id: "biology", label: "Biologiya", icon: "Leaf", color: "var(--color-subj-bio)", glow: "rgba(79,191,168,0.35)" },
];

export const CURRENT_USER: User = {
  id: "u_1",
  name: "Sardor Aliyev",
  grade: "9-sinf",
  school: "42-maktab, Toshkent",
  avatarSeed: "Sardor",
  xp: 2840,
  level: 7,
  streakDays: 12,
  rank: 3,
  badges: [
    { id: "b1", label: "Matematika ustasi", description: "50 ta masalani birinchi urinishda yechdi", icon: "Sigma", unlocked: true, unlockedAt: "2026-08-10" },
    { id: "b2", label: "7 kunlik streak", description: "Ketma-ket 7 kun mashq qildi", icon: "Flame", unlocked: true, unlockedAt: "2026-08-15" },
    { id: "b3", label: "Duel chempioni", description: "10 ta duelda g'alaba qozondi", icon: "Swords", unlocked: true, unlockedAt: "2026-08-20" },
    { id: "b4", label: "100 savol", description: "AI'dan 100 ta savol so'radi", icon: "MessageCircleQuestion", unlocked: false },
    { id: "b5", label: "Tungi bilimdon", description: "22:00 dan keyin 5 marta mashq qildi", icon: "Moon", unlocked: false },
    { id: "b6", label: "Mukammal duel", description: "10/10 to'g'ri javob bilan g'alaba", icon: "Trophy", unlocked: false },
  ],
};

export const CHAT_HISTORY: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content: "Salom, Sardor! Bugun qaysi mavzuda mashq qilamiz? Masalani to'g'ridan-to'g'ri yechib bermayman — birga fikrlaymiz, savol-javob orqali o'zing topasan.",
    createdAt: "2026-08-23T08:02:00Z",
  },
  {
    id: "m2",
    role: "user",
    content: "Kvadrat tenglamani diskriminant orqali yechishda adashyapman: x^2 - 5x + 6 = 0",
    subject: "math",
    createdAt: "2026-08-23T08:03:00Z",
  },
  {
    id: "m3",
    role: "assistant",
    content: "Yaxshi boshladik. Avval diskriminant formulasini eslaylik: D = b^2 - 4ac. Bu tenglamada a, b, c nimaga teng ekanini sen ayta olasanmi?",
    createdAt: "2026-08-23T08:03:20Z",
  },
];

export const SOLVE_RESULT: SolveResult = {
  id: "s1",
  subject: "math",
  imagePreviewUrl: "",
  summary: "3-qadamda belgi xatosi topildi: manfiy sonni ko'paytirishda ishora almashtirilmagan.",
  mistakeStep: 3,
  steps: [
    { step: 1, description: "2x + 3 = -7 tenglama yozildi", isMistake: false },
    { step: 2, description: "Ikkala tomondan 3 ayirildi: 2x = -10", isMistake: false },
    { step: 3, description: "x = -10 / 2 = 5 deb yozilgan", isMistake: true },
    { step: 4, description: "To'g'ri javob: x = -10 / 2 = -5", isMistake: false },
  ],
};

export const ACTIVE_DUEL: Duel = {
  id: "d_204",
  subject: "physics",
  status: "active",
  inviteLink: "Aqurin.uz/duel/d_204",
  createdAt: "2026-08-23T09:00:00Z",
  host: { userId: "u_1", name: "Sardor", avatarSeed: "Sardor", score: 0, correctCount: 0, avgSeconds: 0 },
  opponent: { userId: "u_2", name: "Diyor", avatarSeed: "Diyor", score: 0, correctCount: 0, avgSeconds: 0 },
  questions: [
    { id: "q1", prompt: "Nyutonning ikkinchi qonuni formulasi qaysi?", options: ["F = ma", "F = mv", "E = mc²", "P = mgh"], correctIndex: 0 },
    { id: "q2", prompt: "Yorug'lik tezligi vakuumda taxminan nechaga teng?", options: ["3×10⁵ m/s", "3×10⁶ m/s", "3×10⁸ m/s", "3×10⁴ m/s"], correctIndex: 2 },
    { id: "q3", prompt: "Kuchning SI tizimidagi birligi?", options: ["Joul", "Nyuton", "Vatt", "Paskal"], correctIndex: 1 },
    { id: "q4", prompt: "Erkin tushish tezlanishi (g) taxminan?", options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "7.8 m/s²"], correctIndex: 1 },
    { id: "q5", prompt: "Energiyaning saqlanish qonuni nimani bildiradi?", options: ["Energiya yo'qoladi", "Energiya faqat issiqlikka aylanadi", "Energiya bir turdan ikkinchisiga o'tadi, umumiy miqdori saqlanadi", "Energiya faqat kinetik bo'ladi"], correctIndex: 2 },
  ],
};

export const DUEL_RESULT: DuelResult = {
  duelId: "d_198",
  subject: "math",
  winnerUserId: "u_1",
  host: { userId: "u_1", name: "Sardor", avatarSeed: "Sardor", score: 480, correctCount: 9, avgSeconds: 4.2 },
  opponent: { userId: "u_3", name: "Malika", avatarSeed: "Malika", score: 410, correctCount: 8, avgSeconds: 5.1 },
  xpAwarded: 120,
};

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, userId: "u_9", name: "Jasur Rahimov", avatarSeed: "Jasur", xp: 4210, grade: "9-sinf", trend: "same" },
  { rank: 2, userId: "u_7", name: "Malika Yusupova", avatarSeed: "Malika", xp: 3890, grade: "9-sinf", trend: "up" },
  { rank: 3, userId: "u_1", name: "Sardor Aliyev", avatarSeed: "Sardor", xp: 2840, grade: "9-sinf", trend: "up" },
  { rank: 4, userId: "u_2", name: "Diyor Nazarov", avatarSeed: "Diyor", xp: 2715, grade: "9-sinf", trend: "down" },
  { rank: 5, userId: "u_5", name: "Nodira Karimova", avatarSeed: "Nodira", xp: 2540, grade: "9-A", trend: "same" },
  { rank: 6, userId: "u_6", name: "Aziz Toshev", avatarSeed: "Aziz", xp: 2390, grade: "9-B", trend: "up" },
  { rank: 7, userId: "u_8", name: "Kamola Sodiqova", avatarSeed: "Kamola", xp: 2110, grade: "9-A", trend: "down" },
];

export const DAILY_QUIZ: QuizQuestion[] = [
  {
    id: "dq1",
    prompt: "Fotosintez jarayonida o'simlik nimani chiqaradi?",
    options: ["Kislorod", "Azot", "Vodorod", "Uglerod (IV)-oksid"],
    correctIndex: 0,
    explanation: "O'simliklar fotosintez jarayonida suv va CO₂ dan glyukoza va kislorod hosil qiladi.",
  },
];

export const BADGES: Badge[] = CURRENT_USER.badges;
