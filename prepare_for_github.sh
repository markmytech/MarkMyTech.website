#!/bin/bash

echo "===== Preparing Mark My Tech Website for GitHub Pages ====="
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in your PATH."
    echo "Please install Node.js from https://nodejs.org/ and try again."
    echo
    read -p "Press Enter to exit..."
    exit 1
fi

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies."
        exit 1
    fi
fi

# Create a docs directory for GitHub Pages
echo "Creating docs directory for GitHub Pages..."
rm -rf docs
mkdir -p docs

# Build the frontend
echo "Building the static website..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed."
    exit 1
fi

# Copy the built files to the docs directory
echo "Copying built files to docs directory..."
cp -r dist/* docs/

# Create a .nojekyll file (prevents GitHub from processing the site with Jekyll)
touch docs/.nojekyll

# Create a simple index.html redirect if needed for compatibility
# Normally not needed but added for robustness
if [ ! -f "docs/index.html" ]; then
    echo "Creating index.html redirect..."
    echo "<!DOCTYPE html><html><head><meta http-equiv='refresh' content='0;url=/'></head><body>Redirecting...</body></html>" > docs/index.html
fi

# Create a CNAME file if you have a custom domain
# echo "yourdomain.com" > docs/CNAME

echo
echo "===== Preparation Complete! ====="
echo
echo "Your site is ready for GitHub Pages deployment!"
echo
echo "Next steps:"
echo "1. Commit and push these changes to GitHub"
echo "2. Go to your repository settings"
echo "3. Scroll down to the GitHub Pages section"
echo "4. Select 'main branch /docs folder' as the source"
echo "5. Click Save"
echo
echo "Your site will be available at: https://yourusername.github.io/repository-name/"
echo "Note: Contact form and other backend features will need to be handled differently"
echo "      for a static site deployment."
echo

read -p "Press Enter to exit..."