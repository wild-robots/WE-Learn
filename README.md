
# WE Learn Platform

> **Zero-Friction, Zero-Cost Cohort Learning**

WE Learn is an open-source platform that orchestrates Google Services (Classroom, Calendar) to create and manage learning cohorts. It features an AI Course Architect that helps users design syllabi and instantly provision entire courses.

## 🚀 Quick Start

1.  **Install**: `npm install`
2.  **Environment**: Create `.env.local` with Firebase and Groq keys.
3.  **Run**: `npm run dev`

## 📚 Documentation

Detailed documentation for developers and future AI agents:

-   [`architecture_design.md`](../../.gemini/antigravity/brain/ec6a112c-1242-4390-90da-b76633768e02/architecture_design.md) - **Source of Truth** for system design.
-   [`CONTRIBUTING.md`](../../.gemini/antigravity/brain/ec6a112c-1242-4390-90da-b76633768e02/CONTRIBUTING.md) - Guide for new devs/agents.
-   [`google_setup.md`](../../.gemini/antigravity/brain/ec6a112c-1242-4390-90da-b76633768e02/google_setup.md) - How to configure the Google Cloud Console.
-   [`deployment_guide.md`](../../.gemini/antigravity/brain/ec6a112c-1242-4390-90da-b76633768e02/deployment_guide.md) - Deploying to Firebase Hosting.

## 🛠️ Stack

-   **Frontend**: React + Vite + TypeScript
-   **Auth**: Firebase Auth + Google Identity Services (GIS)
-   **Data**: Firestore (Metadata) + Google Classroom (Content)
-   **AI**: Groq (Llama 3 / Mixtral)

## License
MIT
