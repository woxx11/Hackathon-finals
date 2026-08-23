# Backend verification

The configured backend URL `https://hackathon-finals-0rjs.onrender.com` is reachable. The root path returns `Cannot GET /`, which is expected because the service exposes API routes rather than a landing page. The GET endpoint `/api/users` returns the expected envelope `{ success: true, data: [...] }` with user records including `id`, `name`, `schoolId`, `classId`, `xp`, `level`, `streak`, `badges`, and `stats`.

The mobile API client in `src/api.ts` uses the same base URL and envelope handling and covers the existing endpoints for AI questions, quiz generation, user registration, leaderboard reads, and duel creation.
