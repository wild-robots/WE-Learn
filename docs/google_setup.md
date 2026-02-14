# Google API Setup & Verification Guide

## 1. Enable the Google Classroom API

The error you saw (`Google Classroom API has not been used... or it is disabled`) means the service isn't turned on for your cloud project yet.

**To fix this:**
1.  Click the link from your error message: [Google Cloud Console - Enable Classroom API](https://console.developers.google.com/apis/api/classroom.googleapis.com/overview?project=264421719164)
2.  Click the blue **"ENABLE"** button.
3.  Wait ~1-2 minutes for it to propagate.

## 2. Handling the "Unverified App" Warning

Since your app is in **development mode** and hasn't been audited by Google yet, you will see a warning screen that says *"Google hasn't verified this app"*.

**To bypass this for now (Development Only):**
1.  On the warning screen, click the small **"Advanced"** link.
2.  Click **"Go to WE Learn (unsafe)"** at the bottom.
3.  Type "continue" if prompted (rare).
4.  Grant the requested permissions (Classroom, Calendar, etc.).

> **Note:** You only need to do this once per user account, or whenever you change the requested scopes.

## 3. When & How to Verify

**"When do we do this?"**
You should start the verification process **before you launch publicly** to real users.
-   **Development:** Stay unverified. Add your own email and team members as "Test Users" in the OAuth Consent Screen settings.
-   **Production:** Verify when you are ready to onboard real users outside your organization.

**"How do we make it Google Verified?"**
The process takes 3-7 days and involves:

1.  **Prepare Compliance Docs:**
    -   Host a **Privacy Policy** (URL) on your domain.
    -   Host a **Terms of Service** (URL).
2.  **Submit for Verification:**
    -   Go to [Google Cloud Console > APIs & Services > OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent).
    -   Click **"Publish App"** (pushes it to production).
    -   Click **"Prepare for Verification"**.
3.  **Google Audit:**
    -   Google Trust & Safety team will email you.
    -   You may need to record a YouTube video showing *how* you use the user's data (e.g., "Here is how we create a course in Classroom...").
    -   If you use "Sensitive Scopes" (like `classroom.courses`), you might need a security assessment (CASA), though this depends on user cap.

**For now:**
Just keep the app in **"Testing"** mode in the OAuth Consent Screen and add your email as a test user. This avoids the strict verification requirements while you build.
