# 🎓 "Aqurin" — Maktab uchun AI-yordamchi
### To'liq TZ + Backend struktura + 3 soatlik jang rejasi

---

## 1. G'OYA — nega bu boshqa "AI chatbot" emas

Hakamlar ko'p marta "uy vazifasini AI yechadi" degan g'oyani ko'rgan. Bizniki farqli bo'lishi kerak: **AI — o'qituvchi emas, do'stlaringiz bilan bellashadigan "raqib va hamkor"**.

**Nom taklifi: Aqurin** (yoki BilimJang, Repetitor.uz, ZakovatAI — jamoa tanlaydi)

**Bosh g'oya (hook):** Bu shunchaki savol-javob boti emas — bu **sinfdoshlar bilan bilim bo'yicha "duel" o'ynaydigan, AI esa hakam va murabbiy bo'lgan** ilova. Bola do'stiga "menga qarshi Fizikadan duelga chiq" deb yuboradi — mana shu narsa **o'z-o'zidan tarqaladi** (auditoriya talabiga to'g'ri keladi).

---

## 2. ASOSIY FUNKSIYALAR (jamoa tanlab oladi, hammasi shart emas — lekin MVP uchun ⭐ belgilanganlar majburiy)

### A. Ta'lim yadrosi
- ⭐ **AI Repetitor-chat** — istalgan fandan savol so'rash, AI bosqichma-bosqich tushuntiradi (javobni to'g'ridan-to'g'ri bermaydi, "Sokrat usuli" — savol berib fikrlashga undaydi)
- ⭐ **Rasmga olib yechish** — qo'lda yozilgan masalani telefon kamerasi bilan suratga olasan, AI xatoni topib, qaysi qadamda adashganingni ko'rsatadi
- **Ovozli rejim** — mikrofonga gapirib savol berish, AI ovozli javob beradi (imtihon oldidan "og'zaki so'rash" simulyatsiyasi)
- **Kunlik mavzu generatori** — o'qituvchi/o'quvchi mavzu kiritsa, AI shu mavzu bo'yicha 5 ta test + tushuntirish yaratadi

### B. Viral / ijtimoiy qism (eng muhimi — tarqalishi uchun)
- ⭐ **Duel rejimi** — 2 nafar o'quvchi bir xil fandan 10 ta savolga bir vaqtda javob beradi, kim tez va to'g'ri javob bersa g'olib. Natija chiroyli "story card" (rasm) sifatida generatsiya qilinadi — Instagram/Telegramga ulashish uchun
- **Sinf reytingi (Leaderboard)** — har bir sinf o'zining "haftalik chempioni"ni ko'radi
- **Do'stni taklif qilish** — link orqali taklif qilsang, ikkalangizga ham bonus XP/belgi (badge) beriladi
- **Yutuq nishonlari (Achievements)** — "Matematika ustasi", "7 kunlik streak", "100 ta savolga javob berdi" kabi

### C. O'qituvchilar uchun (ixtiyoriy, lekin hakamlar uchun +ball)
- **Avtomatik test generatori** — o'qituvchi mavzu yozadi, AI test yaratadi, PDF/link qilib sinfga tarqatadi
- **Sinf statistikasi** — qaysi o'quvchi qaysi mavzuda qiynalayotgani haqida dashboard

### D. "Bomba" g'oya — o'ziga xoslik uchun
- **"AI meme qilib tushuntiradi"** — zerikarli mavzuni (masalan, "fotosintez") o'quvchi tanlagan uslubda (anime, memе, rap qofiya) tushuntirib beradi — bu bolalarga juda yoqadi va ular skrinshot qilib ulashadi

> 💡 **Maslahat hakamlar uchun:** Taqdimotda albatta "duel rejimi"ni jonli namoyish qiling — ikki hakamni ekranga chiqarib, jonli duel o'ynating. Bu eng katta "wow-effect" beradi.

---

## 3. ARXITEKTURA VA OQIM

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Landing Page    │────▶│   Asosiy Web App   │◀───▶│  Express Backend │
│  (Next.js)       │     │   (Next.js)        │     │  (Node.js/TS)     │
│  domen: Aqurin.uz│     │  domen: app.Aqurin..│    │  Render/Railway   │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
        │                                                    │
        │ mobil aniqlansa                                    │
        ▼                                                    │
  "APK yuklab olish" tugmasi                                  │
        │                                                     │
        ▼                                                     ▼
┌─────────────────┐                                 ┌──────────────────┐
│  React Native    │────────────────────────────────▶│   Bir xil API     │
│  Mobile App (APK) │                                 │   (REST, JSON)   │
└─────────────────┘                                 └──────────────────┘
```

**Muhim qaror:** Frontend (Next.js), Mobile (React Native) va Landing — barchasi **bitta Express backend**ga ulanadi. Shuning uchun backendni **eng birinchi va eng aniq** qilib qurish kerak — API kontrakti (endpoint nomlari, request/response formatlari) o'zgarmasligi kerak, aks holda 3 jamoa (front/mobile/back) bir-birini kutib qoladi.

---

## 4. BACKEND STRUKTURASI (Express + TypeScript, in-memory DB)

```
backend/
├── src/
│   ├── app.ts                 # asosiy Express konfiguratsiyasi
│   ├── server.ts               # server start, graceful shutdown
│   ├── config/
│   │   └── env.ts              # PORT, OPENAI_API_KEY va h.k.
│   ├── data/                   # 🔑 IN-MEMORY "DATABASE"
│   │   ├── store.ts            # markazlashgan in-memory obyektlar (Map/Array)
│   │   └── seed.ts             # boshlang'ich demo ma'lumotlar
│   ├── modules/
│   │   ├── users/
│   │   │   ├── user.routes.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.types.ts
│   │   ├── ai/
│   │   │   ├── ai.routes.ts        # /api/ai/ask, /api/ai/explain-meme
│   │   │   ├── ai.controller.ts
│   │   │   └── ai.service.ts       # AI provayder bilan ishlash
│   │   ├── duel/
│   │   │   ├── duel.routes.ts      # /api/duel/create, /join, /answer
│   │   │   ├── duel.controller.ts
│   │   │   ├── duel.service.ts
│   │   │   └── duel.socket.ts      # real-vaqt uchun (Socket.io, agar vaqt yetsa)
│   │   ├── quiz/
│   │   │   ├── quiz.routes.ts      # test generatsiyasi
│   │   │   └── quiz.service.ts
│   │   └── leaderboard/
│   │       ├── leaderboard.routes.ts
│   │       └── leaderboard.service.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   ├── logger.ts
│   │   └── validate.ts
│   └── utils/
│       └── idGenerator.ts
├── .env
├── package.json
└── tsconfig.json
```

### Asosiy API endpointlar (kontrakt — front/mobile shu bilan ishlaydi)

| Method | Endpoint | Vazifasi |
|---|---|---|
| POST | `/api/users/register` | Ism, sinf, maktab bilan ro'yxatdan o'tish (login shart emas — soddalashtirish uchun) |
| GET | `/api/users/:id` | Foydalanuvchi profili, XP, badge'lar |
| POST | `/api/ai/ask` | Savol yuborish → AI javobi (matn) |
| POST | `/api/ai/explain-fun` | Mavzu + uslub (meme/anime/rap) → qiziqarli tushuntirish |
| POST | `/api/ai/solve-image` | Rasm (base64) → xato topilgan yechim |
| POST | `/api/duel/create` | Fan tanlab duel yaratish → duel ID va link qaytadi |
| POST | `/api/duel/:id/join` | Duelga qo'shilish |
| POST | `/api/duel/:id/answer` | Savolga javob yuborish |
| GET | `/api/duel/:id/result` | Duel natijasi + share-card uchun ma'lumot |
| GET | `/api/leaderboard/:schoolId` | Sinf/maktab reytingi |
| POST | `/api/quiz/generate` | Mavzu → 5-10 ta test savoli |

**In-memory saqlash misoli** (`store.ts`):
```ts
export const store = {
  users: new Map<string, User>(),
  duels: new Map<string, Duel>(),
  quizzes: new Map<string, Quiz>(),
};
```
> Bu 3 soatlik loyihada juda to'g'ri qaror — DB sozlashga vaqt sarflamaysiz. Faqat **server qayta ishga tushsa ma'lumot o'chib ketishini** taqdimotda ochiq ayting yoki oldindan "demo ma'lumot" (seed) qo'ying, hakamlar oldida bo'sh ekran chiqmasin.

---

## 5. LANDING vs ASOSIY SAYT — qanday bog'lanadi

- **Landing (Aqurin.uz)** — faqat marketing: bosh sahifa, "nima uchun biz", ekran skrinshotlari, "Boshlash" tugmasi
- **"Boshlash" tugmasi** → `app.Aqurin-main.vercel.app`ga (yoki qanday domen bo'lsa) yo'naltiradi (`<a href="https://app-domen.vercel.app">`)
- **Mobil qurilma aniqlansa** (`navigator.userAgent` orqali `Android`/`iPhone` tekshirish), Landingda popup chiqadi:
  > "📱 Ilovamiz bor! Yuklab olasizmi?" → **Ha** bosilsa APK fayl darhol yuklanadi (`<a href="/Aqurin.apk" download>`)
- APK faylni `public/` papkaga qo'yib, to'g'ridan-to'g'ri havola bilan yuklatish eng tez yo'l (Play Store kerak emas, hakamlar oldida darhol ishlaydi)

```js
// Landingda oddiy mobil aniqlash
useEffect(() => {
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  if (isMobile) setShowApkModal(true);
}, []);
```

---

## 6. DIZAYN YO'NALISHI (startup emas, "ilova" his qilinishi uchun)

Oddiy ko'k-oq "SaaS landing" emas — o'quvchilar uchun **energiyali, o'yin-elementli** dizayn kerak:

- **Ranglar:** to'q binafsha/indigo fon (#1A1033 kabi) + neon-yashil yoki quyoshli sariq aksent (#B8FF3C, #FFD23F) — kontrastli, "gaming app" hissi
- **Shrift:** zamonaviy, yumaloq (masalan Inter yoki Manrope) sarlavhalarda, ammo o'ynoqi elementlar (emoji, xarakter-ikonalar) bilan
- **Xarakter/maskot** — AI uchun kichik, do'stona maskot (masalan "sovg'a qutisi ko'zli robot" yoki milliy uslub — "AI Tulki") — chatda va yutuqlarda ko'rinib turadi, bu ilovani "shaxsiylashtiradi"
- **Mikroanimatsiyalar:** XP olganda konfetti, duel g'alabasida ekranda animatsiya (Framer Motion) — bu narsa "startup"dan "ilova" ga farqni his qildiradi
- **Card-based UI:** har bir fan alohida rangli karta (Matematika — ko'k, Fizika — binafsha, Ona tili — yashil)
- **Bottom navigation** (mobil uslubida, hatto web versiyada ham) — Bosh sahifa / Duel / Reyting / Profil

Frontend dizayn skillari bo'yicha aniq CSS/komponent yordamiga muhtoj bo'lsangiz, ayting — men React komponentlarini ham chizib beraman.

---

## 7. 3 SOATLIK JANG REJASI (jamoa bo'linishi bilan)

Faraz: jamoada kamida 3-4 kishi bor (1 backend, 1-2 frontend, 1 mobile/dizayn, 1 taqdimot/pitch).

### ⏱ 0:00 – 0:20 — Reja va bo'linish
- G'oyani yakunlash, funksiyalar ro'yxatidan **MVP uchun aniq 4-5 tasini tanlash** (hammasi emas!)
- API kontraktni yozib olish (yuqoridagi jadval) — hamma shu bilan ishlaydi, keyin o'zgartirmaslik
- Figma/qog'ozda tez skech (5 daqiqa, dizaynga vaqt ketkazmang)

### ⏱ 0:20 – 1:30 — Parallel qurilish (asosiy bosqich)
- **Backend:** `app.ts` skeleton, `store.ts`, `users` va `ai` modullari birinchi, keyin `duel`
- **Frontend:** Landing page + asosiy sahifalar skeleton (chat ekran, duel ekran, profil) — mock data bilan
- **Mobile:** React Native asosiy ekranlar (agar vaqt tanqis bo'lsa — faqat "chat" va "duel" ekranlarini qiling, qolganini web'ga qoldiring)
- **Dizayn:** rang palitrasi, maskot, logotip tayyorlash

### ⏱ 1:30 – 2:00 — Integratsiya #1
- Frontend backend bilan ulanadi (`/api/ai/ask`, `/api/users/register`)
- Mobile ham asosiy 2 endpoint bilan ulanadi
- Birinchi "ishlayapti" holatini tekshiring — barcha jamoa a'zolari sinab ko'rsin

### ⏱ 2:00 – 2:30 — Duel + viral qism
- Duel rejimi backend + frontendda ishlab chiqiladi (eng "wow" qism, vaqt qoldirilishi shart)
- Share-card (natija rasmi) — vaqt qolmasa, oddiy "natija ekrani" bilan cheklaning, share funksiyasini keyingi versiyaga qoldirsa ham bo'ladi

### ⏱ 2:30 – 2:50 — Polish va bug-fix
- APK build qilish va yuklab tekshirish (React Native `expo build` yoki tayyor APK)
- Landing'dagi APK-yuklab olish popup'ini tekshirish
- Barcha ekranlarda demo ma'lumot (seed) borligini tekshiring — bo'sh ekran chiqmasin

### ⏱ 2:50 – 3:00 — Taqdimotga tayyorgarlik
- Kim nima gapirishini taqsimlash: 1) muammo, 2) g'oya (duel-AI), 3) live-demo (duel jonli o'ynatish!), 4) texnologiya, 5) kelajak rejasi
- Vercel'ga deploy qilinganini tasdiqlang (ikkala domen ham ishlayotganini tekshiring)

> ⚠️ **Eng katta xato hackathonlarda:** oxirgi 10 daqiqada demo ishlamay qolishi. Shuning uchun 2:50 dan keyin **hech qanday yangi kod yozmang**, faqat sinab ko'ring.

---

## 8. TAQDIMOT STRUKTURASI (qisqa, 3-4 daqiqa)

1. **Muammo (20 sek):** "O'quvchilar uy vazifasini qiladi, lekin buni zerikarli deb biladi va do'stlari bilan bellashmaydi"
2. **Yechim (20 sek):** "Aqurin — AI yordamchi + do'stlar bilan bilim duel'i"
3. **Live demo (2 daqiqa):** ikkita hakam/jamoa a'zosini chiqarib, jonli duel o'ynatish — bu eng ta'sirli qism
4. **Texnologiya (30 sek):** Next.js + Express + React Native, bitta API orqali barchasi bog'langan
5. **Kelajak (20 sek):** real DB, ota-onalar dashboard, ko'proq fanlar

---

Agar xohlasangiz, keyingi qadam sifatida men sizga:
- Backend `app.ts` va asosiy modullarning tayyor kodi
- Landing page (Next.js) boshlang'ich versiyasi (yuqoridagi dizayn bilan)
- Duel rejimining to'liq logikasi

kabilarni yozib bera olaman — qaysi birini birinchi boshlaylik?
