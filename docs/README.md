# Mark My Tech

This is the static site for Mark My Tech, optimized for GitHub Pages deployment.

## Local Testing

To test this site locally:
1. Simply open the `test-locally.html` file in your browser
2. Or serve this directory with a local server like `python -m http.server`

## GitHub Pages Deployment

This site is configured for GitHub Pages deployment from the `/docs` folder of your repository.
The necessary files for proper routing and SPA functionality are already included.

## Structure

- `index.html`: Main entry point for the application
- `assets/`: Contains compiled JavaScript and CSS
- `404.html`: Handles client-side routing for GitHub Pages
- `test-locally.html`: A simple wrapper for local testing

## Contact Form

For the contact form to work properly in production:
1. Set up a Formspree account and create a form
2. Update the form endpoint in your code
3. Rebuild and redeploy the site
