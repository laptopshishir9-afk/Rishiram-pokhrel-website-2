# How to Deploy to GitHub Pages (Fix for Blank White Page)

If you saw a blank white page when deploying to GitHub Pages, it is because GitHub Pages was trying to serve raw development files (`/src/main.tsx`) directly instead of the compiled production build in `dist/`.

Here are the two easiest ways to deploy your portfolio so it works immediately:

---

### Option 1: Automatic GitHub Actions (Recommended — Zero terminal commands)

1. Push your project code to your GitHub repository.
2. In your repository on GitHub, click the **Settings** tab at the top.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** → **Source**, change the dropdown:
   - From: **"Deploy from a branch"**
   - To: **"GitHub Actions"**
5. A workflow called **"Deploy to GitHub Pages"** will automatically trigger (see the **Actions** tab).
6. In ~1 minute, your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`!

---

### Option 2: 1-Click Deploy via Terminal (`npm run deploy`)

If you prefer deploying directly from your computer using Git:

1. In your terminal, run:
   ```bash
   npm run deploy
   ```
   *(This automatically builds your site and pushes the compiled files to a `gh-pages` branch).*

2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **"Deploy from a branch"**.
   - Select Branch: **`gh-pages`** and Folder: **`/ (root)`**.
   - Click **Save**.

---

### What Was Configured to Ensure 100% Reliability:
- `base: './'` in `vite.config.ts`: Ensures all scripts and stylesheets load properly regardless of your GitHub repository name or subpath.
- `.nojekyll`: Prevents GitHub's Jekyll engine from ignoring files starting with underscores or asset folders.
- `public/404.html`: Ensures page refreshes and direct links do not return a 404 error.
- `.github/workflows/deploy.yml`: Handles automatic building with Node 20 and publishing to GitHub Pages on every push.
- **Profile Photo Bundled**: A high-resolution professional warehouse supervisor portrait is now bundled directly into the project (`public/profile.jpg`, `src/assets/images/profile.jpg`). It automatically appears on GitHub Pages without requiring manual uploads!
- **Interactive Photo Upload**: Visitors can click "Upload Your Photo" / "Replace Photo" directly on the website to test their personal photo, or you can permanently replace `public/profile.jpg` with your own image file in your repository.

