# Netlify Deployment Guide

This guide will help you deploy your Lisah website to Netlify.

## Method 1: Deploy via Netlify Dashboard (Easiest)

### Step 1: Build Your Project Locally (Optional but Recommended)

First, test that your build works:

```bash
npm run build
# or
pnpm build
```

This creates a `dist` folder with your production files.

### Step 2: Push to GitHub (Recommended)

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 3: Deploy on Netlify

1. **Sign up/Login to Netlify:**
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up or log in (you can use GitHub to sign in)

2. **Create a New Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub" (or GitLab/Bitbucket)
   - Authorize Netlify to access your repositories
   - Select your repository

3. **Configure Build Settings:**
   - **Build command:** `npm run build` (or `pnpm build`)
   - **Publish directory:** `dist`
   - Click "Deploy site"

4. **Set Environment Variables (if needed):**
   - Go to Site settings → Environment variables
   - Add `VITE_FORMSPREE_ENDPOINT` if you want to override the default
   - Add any other `VITE_*` variables you need

5. **Your site will be live!**
   - Netlify will give you a URL like: `https://random-name-123.netlify.app`
   - You can customize the domain name in Site settings → Domain management

## Method 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
# or
pnpm add -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Deploy

```bash
# Build your project first
npm run build

# Deploy to Netlify
netlify deploy --prod
```

Follow the prompts to create a new site or link to an existing one.

## Method 3: Drag and Drop (Quick Test)

1. Build your project: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop your `dist` folder
4. Your site will be live in seconds!

**Note:** This method doesn't auto-deploy on changes. Use Method 1 or 2 for continuous deployment.

## Important Notes

### Environment Variables

If you're using environment variables (like `VITE_FORMSPREE_ENDPOINT`), add them in:
- Netlify Dashboard → Site settings → Environment variables
- Or in `netlify.toml` (not recommended for sensitive data)

### Custom Domain

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

### React Router Configuration

The `netlify.toml` file includes a redirect rule that ensures all routes work correctly with React Router. This is already configured for you.

## Troubleshooting

### Build Fails
- Check the build logs in Netlify dashboard
- Make sure all dependencies are in `package.json` (not just `devDependencies`)
- Verify Node.js version (Netlify uses Node 18 by default)

### Routes Not Working
- The `netlify.toml` file should handle this
- If issues persist, check that the redirect rule is correct

### Environment Variables Not Working
- Make sure they start with `VITE_` prefix
- Rebuild after adding variables
- Check that variables are set in Netlify dashboard

## Next Steps

After deployment:
1. Test all pages and forms
2. Set up a custom domain (optional)
3. Enable HTTPS (automatic on Netlify)
4. Set up form notifications in Formspree dashboard

Your site should now be live! 🚀

