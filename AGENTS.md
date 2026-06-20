# Portfolio

A personal developer portfolio: a single-page React + TypeScript app built with Vite and styled with Tailwind CSS / shadcn-ui. It is a static frontend (no backend, no database) deployed to GitHub Pages.

## Cursor Cloud specific instructions

- This repo is a single frontend service. Dependencies are installed via `npm install` (npm is used here; `package-lock.json` is the source of truth even though a `bun.lockb` also exists).
- Standard scripts live in `package.json`: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.
- The dev server (`npm run dev`) listens on port `8080`, but the app is served under the base path `/Portfolio/`. Open `http://localhost:8080/Portfolio/` — the bare `http://localhost:8080/` will 404. This base path is set in `vite.config.ts`.
- `npm run lint` currently exits non-zero due to 2 pre-existing `@typescript-eslint/no-empty-object-type` errors in generated shadcn-ui boilerplate (`src/components/ui/command.tsx`, `src/components/ui/textarea.tsx`) plus several `react-refresh` warnings. These are pre-existing and unrelated to new changes.
- The floating chatbot widget calls a hardcoded external backend (`https://chatbot-omom.onrender.com/api/chat` in `src/components/Chatbot.tsx`). That service is not part of this repo; locally the chat shows a `chatbot.error` message, which is expected. The rest of the site works without it.
- The contact section only renders contact info cards; its form submit handler exists in `src/components/Contact.tsx` but is not currently rendered/wired (submission is simulated via a toast).
