# Deploying WE Learn for Free

You don't need to buy a domain! Google verification accepts free subdomains from reputable hosting providers.

Here are the best free options for deploying your React app:

## Option 1: Vercel (Recommended)
**Why:** Easiest setup, great for React apps, free `.vercel.app` domain.

1.  Push your code to a GitHub repository.
2.  Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
3.  Click **"Add New Project"** -> **"Import"** your repository.
4.  It will auto-detect "Vite".
5.  Click **"Deploy"**.

**Your URL will be:** `https://your-project-name.vercel.app`
Use *this* URL for your Privacy Policy (`/privacy`) and Terms (`/terms`) in the Google Cloud Console.

## Option 2: Netlify
**Why:** Very similar to Vercel, free `.netlify.app` domain.

1.  Push code to GitHub.
2.  Go to [Netlify.com](https://netlify.com) and sign up.
3.  Click **"Add new site"** -> **"Import an existing project"**.
4.  Connect GitHub and select your repo.
5.  **Build Command:** `npm run build`
6.  **Publish directory:** `dist`
7.  Click **"Deploy"**.

**Your URL will be:** `https://your-project-name.netlify.app`

## Option 3: Firebase Hosting
**Why:** You likely already have this since you're using Firebase for Auth/DB!

1.  Install tools: `npm install -g firebase-tools`
2.  Login: `firebase login`
3.  Init: `firebase init`
    - Select **Hosting**.
    - Use your **existing project**.
    - Public directory: `dist`
    - Configure as single-page app? **Yes**.
    - Overwrite index.html? **No**.
4.  Build & Deploy:
    ```bash
    npm run build
    firebase deploy
    ```

**Your URL will be:** `https://your-project-id.web.app`

---

### Important: Update Google Console
Once deployed, take your new URL (e.g., `https://we-learn.vercel.app`) and:
1.  Go to **Google Cloud Console > APIs & Services > Credentials**.
2.  Edit your **OAuth 2.0 Client ID**.
3.  Add the new domain to **Authorized JavaScript origins**.
4.  Add the new redirect URI (e.g., `https://we-learn.vercel.app`) to **Authorized redirect URIs**.
