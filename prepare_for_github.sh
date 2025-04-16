#!/bin/bash

echo "===== Preparing Mark My Tech Website for GitHub Pages ====="
echo
echo "This script will install Node.js if needed, build the site, and prepare it for GitHub Pages"
echo "You may be asked for your password for some installation steps"
echo

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew is not installed. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH
    if [ -f ~/.zshrc ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
        eval "$(/opt/homebrew/bin/brew shellenv)"
    elif [ -f ~/.bash_profile ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
    
    echo "Homebrew installed successfully!"
    echo
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js with Homebrew..."
    brew install node
    
    if ! command -v node &> /dev/null; then
        echo "ERROR: Failed to install Node.js."
        echo "Please install Node.js manually from https://nodejs.org/ and try again."
        exit 1
    fi
    
    echo "Node.js installed successfully!"
    echo
fi

# Display Node.js version
echo "Using Node.js version:"
node --version
echo

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

# Replace the Contact component with the static version
echo "Updating contact form to use Formspree for static hosting..."
if [ -f "docs/index.html" ]; then
    # Add a notification about Formspree setup requirements
    echo "IMPORTANT: For the contact form to work on GitHub Pages, you will need to:"
    echo "1. Create a Formspree.io account"
    echo "2. Create a new form in your Formspree account"
    echo "3. Replace YOUR_FORMSPREE_FORM_ID in client/src/components/sections/ContactStaticVersion.tsx with your form ID"
    echo "4. Rebuild and redeploy the site"
    echo
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
echo
echo "REMINDER: To make the contact form work, set up Formspree as mentioned above."
echo

read -p "Press Enter to exit..."