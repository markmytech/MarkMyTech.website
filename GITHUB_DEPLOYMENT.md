# GitHub Pages Deployment Guide for Mark My Tech

## Repository-Specific Information
- **Repository Name**: MarkMyTech.website
- **GitHub Pages URL**: https://markymtech.github.io/MarkMyTech.website/

## Setup Steps

1. **Push your code to GitHub**
   - Make sure you've pushed all files including the `/docs` directory

2. **Configure GitHub Pages in Settings**
   - Go to your repository's **Settings** tab
   - Find the **Pages** section in the left sidebar
   - Under **Source**, select "Deploy from a branch"
   - Select the branch containing your code (typically "main")
   - Select the "/docs" folder
   - Click **Save**

3. **Check for successful deployment**
   - Look for the green success message with the site URL
   - Note: Deployment may take a few minutes to complete

## Troubleshooting Common Issues

### 404 Error After Deployment

If you see a 404 error after deployment, check:

1. **Repository Visibility**
   - Make sure the repository is public or GitHub Pages is enabled for private repos

2. **Proper Branch & Folder Selection**
   - Verify you've selected the correct branch and "/docs" folder in GitHub Pages settings

3. **File Existence**
   - Confirm the following files exist in your docs directory:
     - index.html
     - 404.html
     - .nojekyll (to prevent Jekyll processing)

4. **URL Structure**
   - The site will be available at: `https://[username].github.io/[repository-name]/`
   - If using a custom domain, set it up in the GitHub Pages settings

5. **Repository Name with Special Characters**
   - Since your repository name "MarkMyTech.website" contains uppercase letters and a period:
     - We've updated `docs/index.html` with the exact repository name:
     ```js
     window.GITHUB_PAGES_ENV = {
       basePath: '/MarkMyTech.website',  // Exactly matches the repository name
       isGitHubPages: true
     };
     ```
   - The router in App.tsx has also been configured to handle this specific repository name
   - This ensures GitHub Pages properly routes your SPA application

### First-time Deployment

If this is your first deployment:
- It might take up to 10 minutes for GitHub Pages to build and deploy your site
- Check the "Actions" tab to monitor deployment progress

## Testing GitHub Pages Locally

To test your GitHub Pages setup locally:
1. Navigate to the `docs` directory
2. Run `node test-server.js` to start a local server
3. Visit http://localhost:8080 in your browser

Remember that GitHub Pages is intended for static sites only - the Express backend will not function in the GitHub Pages environment.