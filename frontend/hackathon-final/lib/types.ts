/**
 * Frontend-side data contract. Shapes mirror the API described in TZ.md
 * (backend is owned separately — this file is what real API responses
 * should be mapped onto).
 */

export type Subject =
  | "math"
  | "physics"
  | "language"
  | "chemistry"
  | "history"
  | "biology";

export interface SubjectMeta {
  id: Subject;
  label: string;
  icon: string;
  color: string;
  glow: string;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface User {
  id: string;
  name: string;
  grade: string;
  school: string;
  avatarSeed: string;
  xp: number;
  level: number;
  streakDays: number;
  rank: number;
  badges: Badge[];
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  subject?: Subject;
  createdAt: string;
}

export interface SolveStep {
  step: number;
  description: string;
  isMistake: boolean;
}

export interface SolveResult {
  id: string;
  subject: Subject;
  imagePreviewUrl: string;
  summary: string;
  mistakeStep: number;
  steps: SolveStep[];
}

export type DuelStatus = "waiting" | "active" | "finished";

export interface DuelQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface DuelParticipant {
  userId: string;
  name: string;
  avatarSeed: string;
  score: number;
  correctCount: number;
  avgSeconds: number;
}

export interface Duel {
  id: string;
  subject: Subject;
  status: DuelStatus;
  inviteLink: string;
  questions: DuelQuestion[];
  host: DuelParticipant;
  opponent?: DuelParticipant;
  createdAt: string;
}

export interface DuelResult {
  duelId: string;
  subject: Subject;
  winnerUserId: string;
  host: DuelParticipant;
  opponent: DuelParticipant;
  xpAwarded: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarSeed: string;
  xp: number;
  grade: string;
  trend: "up" | "down" | "same";
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
