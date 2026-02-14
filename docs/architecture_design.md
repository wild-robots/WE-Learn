# WE Learn Architecture & Design System

> **Source of Truth** for the WE Learn Platform.
> Last Updated: Feb 2025

## 1. Core Philosophy: "Zero Friction, Zero Cost"
WE Learn is a platform that orchestrates **Google Services** to create cohort-based learning experiences. We do not reinvent the LMS; we leverage **Google Classroom** and **Google Calendar**.

**Constraints:**
-   **No Budget**: Everything must run on free tiers (Firebase Spark Plan, Groq Free Tier, Google Workspace Fundamentals).
-   **Open Source**: Codebase is public; secrets must be handled via environment variables.

## 2. System Architecture

### Frontend
-   **Framework**: React (Vite) + TypeScript
-   **Styling**: Tailwind CSS + Custom "Glassmorphism" Design System
-   **Hosting**: Firebase Hosting (SPA Rewrite to `index.html`)

### Backend & Data
-   **Database**: Google Cloud Firestore (NoSQL)
    -   `cohorts`: Metadata for active groups (title, schedule, progress).
    -   *Note: Detailed student data lives in Google Classroom, not Firestore.*
-   **Authentication**: Hybrid Model
    -   **Firebase Auth**: Handles the session and user identity.
    -   **Google Identity Services (GIS)**: Handles "Incremental Authorization" for accessing Classroom/Calendar APIs.
    -   *Why?* Firebase Auth is robust for login, but GIS is required for modern, granular Google API access.

### AI Agents
-   **Provider**: Groq (Llama 3 / Mixtral) via `groq.ts` shared service.
-   **Course Architect**: An agent that interviews the user and generates structured JSON for:
    -   Course Title & Description
    -   Syllabus Modules
    -   Schedule & Duration
    -   Difficulty Level

## 3. Key Workflows

### A. The "Course Architect" Flow
1.  **Interview**: User chats with AI to refine idea.
2.  **Structure**: AI generates course metadata.
3.  **Launch**:
    -   Frontend calls Google Classroom API to create a new Course.
    -   Frontend writes metadata to Firestore (`cohorts` collection).
    -   User is redirected to the new Classroom.

### B. The "Join" Flow
1.  User clicks "Join" on a stored Cohort.
2.  App checks for `classroom.courses` scope.
3.  App calls `classroom.courses.students.create` using the cohort's `enrollmentCode`.
4.  User is added to the Classroom and Calendar automatically.

## 4. Directory Structure

```
platform/
├── components/         # React UI Components
│   ├── CourseArchitect # The AI Agent Logic
│   ├── Hero            # Landing Page Chatbot
│   ├── CohortDetail    # Course View
│   └── ...
├── classroom.ts        # Google Classroom API Service
├── googleAuth.ts       # GIS Token Management (Caching/Expiry)
├── groq.ts             # AI Service Adapter
├── firebase.ts         # Firebase Config
└── types.ts            # Shared TypeScript Interfaces
```

## 5. Deployment
-   **Platform**: Firebase Hosting
-   **Config**: `firebase.json`
-   **Environment**: `.env.local` contains all public API keys (Firebase, Groq).
-   **Verification**: Google OAuth verification is required for production use of "Sensitive Scopes" (Classroom/Calendar).

## 6. Security Disclosure: Runtime API Keys
> [!WARNING]
> **Current State**: Groq API keys are handled via `VITE_GROQ_API_KEY` and are exposed in the client-side bundle.
>
> **Rationale**: This was chosen to maintain the **$0 Budget (Firebase Spark Plan)**. Firebase Functions requires the paid "Blaze" plan for outbound requests to non-Google APIs (like Groq).

### Security Hardening (Roadmap)
To achieve "No client-side keys" for $0:
1.  **Vercel/Netlify Functions**: Use a serverless provider that allows outbound requests on their free tier.
2.  **Proxy Route**: Create an `/api/chat` route that holds the secret key and forwards requests to Groq.
3.  **Update**: Point `groq.ts` to this new internal endpoint.

## 7. Collaborative Workflows

### WhatsApp Implementation (Manual Integration)
- **Who/When**: The Course Guide (creator) creates a WhatsApp group manually once the cohort is initialized.
- **Link Sharing**: The creator pastes the invite link into the platform (requires adding a `whatsappLink` field to the Cohort model).
- **Security**: The "Join Community" button is only visible to logged-in users who have successfully joined the cohort roster.
- **Zero Cost**: This method is 100% free and avoids Twilio/Enterprise API costs.

## 8. Development Roadmap
- [ ] Migrate Groq API to a backend proxy (Vercel/Cloud Functions).
- [ ] Add `whatsappLink` field to Firestore `cohorts` collection.
- [ ] Implement manual link input in the Course Architect "Launch" phase.
