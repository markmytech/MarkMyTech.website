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

# Copy public/index.html to the root for better compatibility
echo "Creating a proper index.html in the root..."
if [ -f "docs/public/index.html" ]; then
    cp docs/public/index.html docs/index.html
fi

# Fix the asset paths in all index.html files for GitHub Pages compatibility
echo "Fixing asset paths for GitHub Pages..."
if [ -f "docs/index.html" ]; then
    # Update the main index.html
    sed -i'.bak' -e 's|src="/assets/|src="./public/assets/|g' docs/index.html
    sed -i'.bak' -e 's|href="/assets/|href="./public/assets/|g' docs/index.html
    rm -f docs/index.html.bak
fi

if [ -f "docs/public/index.html" ]; then
    # Update the public/index.html
    sed -i'.bak' -e 's|src="/assets/|src="./assets/|g' docs/public/index.html
    sed -i'.bak' -e 's|href="/assets/|href="./assets/|g' docs/public/index.html
    rm -f docs/public/index.html.bak
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

# Create a 404.html file for GitHub Pages to support client-side routing
echo "Creating 404.html for client-side routing support..."
cat > docs/404.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mark My Tech</title>
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script takes the current url and converts the path and query
    // string into just a query string, and then redirects the browser
    // to the new url with only a query string and hash fragment,
    // e.g. https://www.foo.tld/one/two?a=b&c=d#qwe, becomes
    // https://www.foo.tld/?/one/two&a=b~and~c=d#qwe
    // Note: this 404.html file must be at least 512 bytes for it to work
    // with Internet Explorer (it is currently > 512 bytes)

    // If you're creating a Project Pages site and NOT using a custom domain,
    // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
    // This way the code will only replace the route part of the path, and not
    // the real directory in which the app resides, for example:
    // https://username.github.io/repo-name/one/two?a=b&c=d#qwe, becomes
    // https://username.github.io/repo-name/?/one/two&a=b~and~c=d#qwe
    // Otherwise, leave pathSegmentsToKeep as 0.
    var pathSegmentsToKeep = 1;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
</body>
</html>
EOF

# Add redirect script to index.html
echo "Adding routing script to index.html..."
if [ -f "docs/index.html" ]; then
    # Create a temporary file with the routing script
    TEMP_SCRIPT=$(cat << 'EOF'
  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // MIT License
    // https://github.com/rafgraph/spa-github-pages
    // This script checks to see if a redirect is present in the query string,
    // converts it back into the correct url and adds it to the
    // browser's history using window.history.replaceState(...),
    // which won't cause the browser to attempt to load the new url.
    // When the single page app is loaded further down in this file,
    // the correct url will be waiting in the browser's history for
    // the single page app to route accordingly.
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <!-- End Single Page Apps for GitHub Pages -->
EOF
)

    # Use sed to insert the script right before the closing head tag
    sed -i'.bak' "s|</head>|$TEMP_SCRIPT\n</head>|g" docs/index.html
    rm -f docs/index.html.bak
    
    # Also add it to the public/index.html
    if [ -f "docs/public/index.html" ]; then
        sed -i'.bak' "s|</head>|$TEMP_SCRIPT\n</head>|g" docs/public/index.html
        rm -f docs/public/index.html.bak
    fi
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