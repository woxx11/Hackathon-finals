# Deployment audit — 2026-08-23

- `https://hackathon-finals.vercel.app/` is a polished landing page in Uzbek. Its primary `Boshlash` links currently point to `https://app-aqlzor.vercel.app` rather than the deployed main site.
- `https://hackathon-finals-41v6.vercel.app/` currently serves the untouched Next.js starter page at `/`, confirming that the intended dashboard application is not yet wired to the root route in this deployment.
- The live backend is `https://hackathon-finals-0rjs.onrender.com`; its API envelope and routes were previously verified in `apk/backend-verification.md`.
