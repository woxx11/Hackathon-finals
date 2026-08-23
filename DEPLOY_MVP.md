# AqlZo'r MVP deployment runbook

## 1. Render — backend

Create or open the Render Web Service connected to this repository. Set **Root Directory** to `backend`. Use the following commands:

| Setting | Value |
|---|---|
| Runtime | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Health check path | `/health` |
|

Add these environment variables in Render:

```env
GEMINI_API_KEY=your_gemini_key_if_available
FRONTEND_ORIGIN=https://hackathon-finals.vercel.app
APK_URL=https://your-public-storage.example/aqlzor.apk
```

`GEMINI_API_KEY` is optional because the backend has deterministic fallbacks. `APK_URL` is required for a real APK download. Upload the release APK to a public object-storage URL or a GitHub Release asset, then paste that direct file URL into `APK_URL`. After deploy, verify:

```text
https://hackathon-finals-0rjs.onrender.com/health
https://hackathon-finals-0rjs.onrender.com/downloads/aqlzor.apk
```

The `/downloads/aqlzor.apk` endpoint redirects to `APK_URL`, so all web and mobile buttons use one stable URL.

## 2. Vercel — main application

Import the repository as a separate Vercel project. Set **Root Directory** to `frontend/hackathon-final`. Vercel will detect Next.js. Use `npm run build` as the build command and leave the output directory managed by Next.js.

Add this environment variable:

```env
NEXT_PUBLIC_API_URL=https://hackathon-finals-0rjs.onrender.com
```

The root page `/` is now the login/register screen. A successful login sends the user to `/dashboard`. Do not configure a redirect from `/` to `/dashboard`.

## 3. Vercel — landing page

Keep the landing as a separate Vercel project with **Root Directory** set to `frontend-landing/aqlzor_landing`. Use `npm run build`. The landing's `Boshlash` actions now point to the main app root:

```text
https://hackathon-finals-41v6.vercel.app/
```

The landing's Android buttons point to:

```text
https://hackathon-finals-0rjs.onrender.com/downloads/aqlzor.apk
```

If the Vercel deployment generates a different domain, replace the main app URL in `components/navbar.tsx`, `components/hero.tsx`, and `components/cta-section.tsx` before the final redeploy.

## 4. APK release

The Expo project in `apk` is the source project; it is not itself a binary APK. Build a release APK with an Expo/EAS Android build, upload the resulting `.apk` to public storage, set that URL as `APK_URL` in Render, redeploy the backend, and then test the download URL from both the landing and main app.
