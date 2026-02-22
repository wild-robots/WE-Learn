# Contributing to WE Learn

Welcome! This document is for developers and AI agents joining the project.

## 🌟 Quick Start for Agents

**Context:**
-   **Docs**: Read `architecture_design.md` first. It is the Source of Truth.
-   **State**: The app is a hybrid React SPA with **Serverless API Routes** (`api/` folder).
-   **Keys**: You need a `.env.local` file for local development. For production/preview, you must also set `GROQ_API_KEY` in your hosting provider's (Vercel/Netlify) environment settings.

## 🛠️ Setup

1.  **Install**: `npm install`
2.  **Env**: Ask the user for the `.env.local` content if missing.
3.  **Run**: `npm run dev` (Runs on port 3000 or 3001)

## 🏗️ Architecture constraints

1.  **Zero Cost**: Do not add paid services. Use Free Tier compatible solutions only.
    -   *Database*: Firestore
    -   *Auth*: Firebase + Google Identity Services
    -   *Hosting*: Firebase Hosting (or Vercel)
    -   *AI*: Groq (Free Tier) or Gemini Flash

2.  **No "Ejecting"**: We use standard Vite/React. Do not introduce complex build steps without approval.

3.  **Google APIs**: Use `classroom.ts` and `googleAuth.ts`.
    -   *Never* hardcode access tokens.
    -   Always use `requestStepUpAuth()` to ask for permissions incrementally.

## 📝 Coding Standards

-   **Styling**: Tailwind CSS. Use `glass` utility for the signature look.
-   **Icons**: `lucide-react`.
-   **Types**: Keep `types.ts` updated. Avoid `any`.
-   **Artifacts**: Update `architecture_design.md` if you change core flows.

## 🤝 Collaborative Workflow

Since this project (wild-robots/WE-Learn) is designed for multiple contributors and AI agents:

1. **Branching**: Do not push directly to `main`. Create a descriptive branch for your work (e.g., `feat/whatsapp-integration` or `fix/auth-loop`).
2. **Pull Requests**: Submit a PR when your task is ready. Use the provided PR template to explain your changes.
3. **Agent Handoff**: When passing the project to a new agent:
   - Ensure `architecture_design.md` is updated if you changed the system flow.
   - Leave a clear "State of the Union" in the PR or a final commit message.

## 🚀 Deployment

The project is configured for **Firebase Hosting**.
-   `npm run build`
-   `npx firebase deploy`

*See `deployment_guide.md` for details on domains.*
