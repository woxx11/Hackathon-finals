export interface User {
  id: string;
  name: string;
  schoolId: string;
  classId: string;
  xp: number;
  level: number;
  streak: number;
  badges: string[];
  stats: Record<string, number>;
}

export interface Duel {
  id: string;
  subject: string;
  player1Id: string;
  player2Id?: string;
  status: 'waiting' | 'active' | 'completed';
  questions: any[];
  p1Score: number;
  p2Score: number;
  winnerId?: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Azizbek', schoolId: 'school-1', classId: '10A', xp: 1500, level: 5, streak: 12, badges: ['First Win', 'Math Genius'], stats: { Math: 10, History: 2 } },
  { id: '2', name: 'Malika', schoolId: 'school-1', classId: '10A', xp: 1450, level: 4, streak: 5, badges: ['Fast Thinker'], stats: { Science: 8 } },
  { id: '3', name: 'Jasur', schoolId: 'school-2', classId: '9B', xp: 1300, level: 4, streak: 2, badges: ['Quiz Master'], stats: { Math: 5 } },
  { id: '4', name: 'Nodira', schoolId: 'school-1', classId: '10B', xp: 2600, level: 8, streak: 20, badges: ['Legend', 'Top Scorer'], stats: { Math: 20, Science: 15 } },
  { id: '5', name: 'Rustam', schoolId: 'school-2', classId: '9A', xp: 750, level: 2, streak: 1, badges: [], stats: { History: 3 } },
  { id: '6', name: 'Dilnoza', schoolId: 'school-3', classId: '11A', xp: 3200, level: 10, streak: 30, badges: ['Legend', 'Explorer'], stats: { Math: 25, History: 10 } },
  { id: '7', name: 'Timur', schoolId: 'school-1', classId: '10A', xp: 550, level: 2, streak: 3, badges: ['First Win'], stats: { Math: 2 } },
  { id: '8', name: 'Zilola', schoolId: 'school-2', classId: '9B', xp: 400, level: 1, streak: 0, badges: [], stats: { Science: 1 } },
  { id: '9', name: 'Ulugbek', schoolId: 'school-3', classId: '11B', xp: 1800, level: 6, streak: 10, badges: ['Top Scorer'], stats: { Physics: 12 } },
  { id: '10', name: 'Shahnoza', schoolId: 'school-1', classId: '10B', xp: 900, level: 3, streak: 4, badges: ['Quick Learner'], stats: { Math: 5 } },
  { id: '11', name: 'Farhod', schoolId: 'school-2', classId: '9A', xp: 1100, level: 3, streak: 5, badges: ['Quiz Master'], stats: { Math: 7 } },
  { id: '12', name: 'Asal', schoolId: 'school-3', classId: '11A', xp: 2100, level: 7, streak: 14, badges: ['Legend'], stats: { Science: 18 } },
  { id: '13', name: 'Javohir', schoolId: 'school-1', classId: '10A', xp: 300, level: 1, streak: 1, badges: [], stats: { Math: 1 } },
  { id: '14', name: 'Madina', schoolId: 'school-2', classId: '9B', xp: 1750, level: 5, streak: 8, badges: ['Math Genius'], stats: { Math: 14 } },
  { id: '15', name: 'Sardor', schoolId: 'school-3', classId: '11B', xp: 850, level: 2, streak: 2, badges: ['First Win'], stats: { History: 4 } },
  { id: '16', name: 'Rayhon', schoolId: 'school-1', classId: '10B', xp: 1250, level: 4, streak: 6, badges: ['Explorer'], stats: { Science: 6 } },
  { id: '17', name: 'Bekzod', schoolId: 'school-2', classId: '9A', xp: 600, level: 2, streak: 3, badges: [], stats: { Math: 3 } },
  { id: '18', name: 'Gulnora', schoolId: 'school-3', classId: '11A', xp: 2500, level: 8, streak: 18, badges: ['Top Scorer', 'Legend'], stats: { History: 20 } },
  { id: '19', name: 'Doston', schoolId: 'school-1', classId: '10A', xp: 1900, level: 6, streak: 11, badges: ['Fast Thinker'], stats: { Science: 10 } },
  { id: '20', name: 'Sevara', schoolId: 'school-2', classId: '9B', xp: 950, level: 3, streak: 4, badges: ['Quiz Master'], stats: { Math: 6 } },
  { id: '21', name: 'Bobur', schoolId: 'school-3', classId: '11B', xp: 1400, level: 4, streak: 7, badges: ['First Win'], stats: { Math: 8 } },
  { id: '22', name: 'Iroda', schoolId: 'school-1', classId: '10B', xp: 2200, level: 7, streak: 15, badges: ['Legend'], stats: { Science: 16 } },
  { id: '23', name: 'Sanjar', schoolId: 'school-2', classId: '9A', xp: 500, level: 1, streak: 2, badges: [], stats: { Math: 2 } },
  { id: '24', name: 'Umida', schoolId: 'school-3', classId: '11A', xp: 3100, level: 10, streak: 25, badges: ['Legend', 'Top Scorer'], stats: { Math: 30 } },
  { id: '25', name: 'Murod', schoolId: 'school-1', classId: '10A', xp: 800, level: 2, streak: 3, badges: ['Explorer'], stats: { History: 5 } }
];

export const users: Map<string, User> = new Map(mockUsers.map(u => [u.id, u]));

export const duels: Map<string, Duel> = new Map([
  ['duel-1', {
    id: 'duel-1',
    subject: 'Math',
    player1Id: '1',
    player2Id: '2',
    status: 'completed',
    questions: [{ q: 'What is 2+2?', a: '4' }],
    p1Score: 1,
    p2Score: 0,
    winnerId: '1'
  }],
  ['duel-2', {
    id: 'duel-2',
    subject: 'History',
    player1Id: '3',
    player2Id: '4',
    status: 'active',
    questions: [{ q: 'Who discovered America?', a: 'Columbus' }],
    p1Score: 1,
    p2Score: 0
  }],
  ['duel-3', {
    id: 'duel-3',
    subject: 'Science',
    player1Id: '5',
    status: 'waiting',
    questions: [{ q: 'What is H2O?', a: 'Water' }],
    p1Score: 0,
    p2Score: 0
  }]
]);

export const generateId = () => Math.random().toString(36).substr(2, 9);
