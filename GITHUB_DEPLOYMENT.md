# Mark My Tech - GitHub Pages Deployment

## How to Deploy

1. Push all the code to your GitHub repository
2. Go to your repository settings
3. Scroll down to the "GitHub Pages" section
4. Select the "main" branch and "/docs" folder as the source
5. Click "Save"

The website will be deployed at: https://yourusername.github.io/your-repository-name/

## About the Deployment

- The `docs` folder contains a complete, self-contained static version of the site
- Assets are properly linked with relative paths
- Client-side routing is supported via the 404.html technique
- A .nojekyll file is included to prevent GitHub's Jekyll processing

## Testing Locally

You can test the built site locally by opening `docs/test-locally.html` in your browser.

## Contact Form

The contact form on the deployed site works differently from the development environment:
- It uses Formspree.io to handle form submissions
- Forms are sent via email to the address you specified during Formspree setup

