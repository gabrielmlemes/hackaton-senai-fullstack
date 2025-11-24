# Copilot / AI Agent Instructions for FSW-Barber

This file contains concise, project-specific guidance to help AI coding agents be immediately productive.

**Big Picture**
- **Frontend:** A Next.js 14 app using the app-router under `frontend/app/`. UI components follow the `app/_components` and `app/_components/ui` (shadcn-style) conventions. Server-side helpers live in `app/_lib/` (notably `prisma.ts` and `auth.ts`).
- **Database:** Prisma is configured in `frontend/prisma/schema.prisma` and the Prisma client is exported from `frontend/app/_lib/prisma.ts` (global caching in dev).
- **Auth:** NextAuth with the Prisma adapter is configured in `frontend/app/_lib/auth.ts`. Environment variables control Google OAuth and `NEXTAUTH_SECRET`.
- **Backend (demo):** A separate Flask demo API lives in `backend/` (`app.py`, `data.py`). It uses in-memory mocks and runs on port 5000 — it is independent of the frontend/Prisma database and intended as a prototype/demo.

**When to touch which part**
- Modify UI or routing inside `frontend/app/` and `frontend/app/_components`.
- Make DB/ORM changes in `frontend/prisma/` and update `frontend/app/_lib/prisma.ts` only if you need different client behavior.
- Change authentication flows in `frontend/app/_lib/auth.ts` and corresponding environment variables in `frontend/.env`.
- Only alter `backend/` if you intend to update the Flask demo API. Treat it as a separate service.

**Local dev & common commands**
- Install frontend deps and start dev server:
  - `cd frontend`
  - `npm install`
  - `npm run dev` (starts Next.js on `http://localhost:3000`)
- Prisma / DB tasks (from `frontend/`):
  - `npx prisma generate` — generate client
  - `npx prisma migrate dev` or `npx prisma db push` — apply schema locally
  - `npx prisma db seed` — runs `prisma/seed.ts` (package.json `prisma.seed`)
- Run backend demo API (from `backend/`):
  - Create venv and install: `python -m venv .venv && .venv/Scripts/activate` (Windows) then `pip install -r requirements.txt`
  - `python app.py` — Flask runs on `http://localhost:5000`

**Environment variables (important)**
- See `frontend/.env` for the keys used:
  - `DATABASE_URL` — Postgres connection for Prisma
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — NextAuth Google provider
  - `NEXTAUTH_URL`, `NEXTAUTH_SECRET` — required by NextAuth

**Project-specific patterns / conventions**
- _Prisma client caching:_ `frontend/app/_lib/prisma.ts` uses a global cache to avoid multiple clients in dev. Keep this pattern when adding other long-lived clients.
- _NextAuth adapter:_ `frontend/app/_lib/auth.ts` wires `PrismaAdapter(db)`. When altering user/session models, update both `schema.prisma` and NextAuth callbacks.
- _Server Actions:_ `frontend/app/_actions/` contains server actions (e.g., `create-booking.ts`) used by client forms — prefer these for server-side mutations when possible.
- _UI conventions:_ Reusable UI pieces are under `app/_components/ui/*` (shadcn naming). New components should follow existing prop shapes and export default React components.

**Integration notes & gotchas**
- Frontend expects Prisma to be available locally; if `DATABASE_URL` is empty the app will still build but features requiring DB will fail at runtime. For quick local work you can use a local Postgres or an SQLite fallback via Prisma (requires schema change).
- The Flask `backend/` is a standalone mock service — do not assume it writes to the same database as Prisma.
- `frontend/package.json` contains a `prepare` script that runs `husky && prisma generate`. If cloning the repo, run `npm install` before committing hooks to avoid prepare hook failures.

**Key files to inspect for context**
- `frontend/app/_lib/prisma.ts` — Prisma client pattern (global cache)
- `frontend/app/_lib/auth.ts` — NextAuth + Prisma adapter
- `frontend/prisma/schema.prisma` — DB model definitions (User, Booking, Barbershop, Service)
- `frontend/app/_actions/*.ts` — server actions for bookings (create/delete/get)
- `backend/app.py`, `backend/data.py`, `backend/DOCUMENTATION.md` — demo Flask API and its behavior (in-memory)

If anything in these instructions is unclear or you want more detail (examples of server actions, Prisma migration commands, or how NextAuth session enrichment works), tell me which section to expand and I'll update this file.
