import type { Subject } from "./types";

const SOCRATIC_REPLIES: string[] = [
  "Yaxshi savol. Avval o'zing ayt-chi, bu yerda qaysi qoidani qo'llash kerak deb o'ylaysan?",
  "Keling, bosqichma-bosqich boraylik. Birinchi qadamda nima berilgan edi?",
  "Deyarli to'g'ri yo'ldasan. Endi shu natijani tekshirib ko'r — boshqa usul bilan ham chiqadimi?",
  "Bu yerda kichik bir tafsilotni o'tkazib yuboribsan. Yana bir bor diqqat bilan qara — nima o'zgarishi kerak?",
  "Zo'r fikrlayapsan! Endi shu mantiqni davom ettirsang, keyingi qadam nima bo'ladi?",
  "To'xtab tur — shu joyda savol beray: agar shartni o'zgartirsak, javob ham o'zgaradimi?",
];

const SUBJECT_OPENERS: Partial<Record<Subject, string>> = {
  math: "Matematikada har doim shartni qayta o'qishdan boshlaymiz.",
  physics: "Fizikada formula emas, avval hodisaning o'zini tasavvur qil.",
  language: "Bu yerda qoidani emas, matn mantig'ini his qilishga harakat qil.",
  chemistry: "Reaksiya tenglamasini balansdan boshlaymiz.",
  history: "Sana emas, sabab-oqibat bog'lanishini top.",
  biology: "Jarayonni bosqichma-bosqich tasavvur qilib ko'r.",
};

let replyIndex = 0;

export function getSocraticReply(subject?: Subject): string {
  const opener = subject ? SUBJECT_OPENERS[subject] : undefined;
  const reply = SOCRATIC_REPLIES[replyIndex % SOCRATIC_REPLIES.length];
  replyIndex += 1;
  return opener ? `${opener} ${reply}` : reply;
}
