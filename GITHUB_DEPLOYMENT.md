# GitHub Pages Deployment Guide for Mark My Tech

## CRITICAL: CASE SENSITIVITY IN URLS

The repository name **MarkMyTech.website** contains uppercase letters and a period. GitHub Pages URLs are **CASE SENSITIVE**.

- **Correct URL**: https://markymtech.github.io/MarkMyTech.website/
- **Incorrect URL**: https://markymtech.github.io/markmytech.website/ (will show 404)

## Complete Setup Instructions

1. **Push your code to GitHub**
   - Make sure you've pushed all files including the `/docs` directory
   - Verify that `.nojekyll` exists in the `/docs` folder (prevents Jekyll processing)

2. **Configure GitHub Pages in Settings**
   - Go to your repository's **Settings** tab
   - Find the **Pages** section in the left sidebar
   - Under **Source**, select "Deploy from a branch"
   - Select the branch containing your code (typically "main")
   - In the folder dropdown, select "/docs"
   - Click **Save**

3. **Wait for Deployment (5-10 minutes)**
   - Initial deployment can take up to 10 minutes
   - You can monitor progress in the "Actions" tab

4. **Access Your Site Using The Exact URL**
   - Use the EXACT URL: https://markymtech.github.io/MarkMyTech.website/
   - Note the capital letters! GitHub Pages URLs are case-sensitive

## Troubleshooting 404 Errors

If you see a 404 error after deployment, check:

1. **URL Case Sensitivity**
   - Make sure you're using the exact repository name with correct capitalization
   - Use: `https://markymtech.github.io/MarkMyTech.website/` (not lowercase)

2. **Repository and GitHub Pages Settings**
   - Verify the repository is public
   - Confirm "/docs" folder is selected as the source in GitHub Pages settings
   - Check if GitHub shows a green success message in Pages settings

3. **File Verification**
   - Run this checklist for required files in the `/docs` folder:
     - [✓] index.html
     - [✓] 404.html
     - [✓] .nojekyll
     - [✓] assets folder with CSS/JS files

4. **Browser Cache Issues**
   - Try accessing the site in an incognito/private browser window
   - Or clear your browser cache before trying again

5. **Wait Longer For First Deployment**
   - First GitHub Pages deployment can take up to 10 minutes
   - Subsequent deployments are usually faster (2-5 minutes)

## Manual Fixes If Still Seeing 404s

If you're still experiencing 404 errors:

1. **Create a standalone index.html** in the root of your repository with a redirect:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta http-equiv="refresh" content="0; url=https://markymtech.github.io/MarkMyTech.website/">
   </head>
   <body>
     Redirecting to <a href="https://markymtech.github.io/MarkMyTech.website/">Mark My Tech</a>
   </body>
   </html>
   ```

2. **Contact GitHub Support** if issues persist after trying all troubleshooting steps

## Testing Locally

Before deploying to GitHub Pages, test your site locally:

1. Navigate to the `docs` directory in your terminal
2. Install express if needed: `npm install express`
3. Run: `node test-server.js`
4. Visit http://localhost:3000 in your browser

Note: The Express backend will not function in GitHub Pages as it's a static hosting platform.