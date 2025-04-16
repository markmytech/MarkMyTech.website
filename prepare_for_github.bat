@echo off
echo ===== Preparing Mark My Tech Website for GitHub Pages =====
echo.
echo This script will download and install Node.js if needed, build the site, and prepare it for GitHub Pages
echo You may need to confirm installation steps in popup windows
echo.

:: Check if Node.js is installed
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Downloading and installing Node.js...
    
    :: Create a temporary directory for downloads
    mkdir temp_downloads 2>nul
    cd temp_downloads
    
    :: Download Node.js installer using PowerShell
    echo Downloading Node.js installer...
    powershell -Command "& {(New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi', 'node_installer.msi')}"
    
    IF NOT EXIST node_installer.msi (
        echo ERROR: Failed to download Node.js installer.
        echo Please download and install Node.js manually from https://nodejs.org/ and try again.
        cd ..
        pause
        exit /b 1
    )
    
    :: Run the installer
    echo Installing Node.js...
    start /wait msiexec /i node_installer.msi /quiet /qn
    
    :: Clean up
    cd ..
    rmdir /s /q temp_downloads
    
    :: Verify installation
    WHERE node >nul 2>nul
    IF %ERRORLEVEL% NEQ 0 (
        echo ERROR: Node.js installation failed.
        echo Please install Node.js manually from https://nodejs.org/ and try again.
        echo.
        pause
        exit /b 1
    )
    
    echo Node.js installed successfully!
    echo.
)

:: Display Node.js version
echo Using Node.js version:
node --version
echo.

:: Install dependencies if not already installed
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    IF %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install dependencies.
        pause
        exit /b 1
    )
)

:: Create a docs directory for GitHub Pages
echo Creating docs directory for GitHub Pages...
if exist "docs\" rmdir /s /q docs
mkdir docs

:: Build the frontend
echo Building the static website...
call npm run build
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed.
    pause
    exit /b 1
)

:: Copy the built files to the docs directory
echo Copying built files to docs directory...
xcopy /s /e /y dist\* docs\

:: Create a .nojekyll file (prevents GitHub from processing the site with Jekyll)
type nul > docs\.nojekyll

:: Create a simple index.html redirect if needed for compatibility
:: Normally not needed but added for robustness
if not exist "docs\index.html" (
    echo Creating index.html redirect...
    echo ^<!DOCTYPE html^>^<html^>^<head^>^<meta http-equiv='refresh' content='0;url=/'^^>^</head^>^<body^>Redirecting...^</body^>^</html^> > docs\index.html
)

:: Replace the Contact component with the static version
echo Updating contact form to use Formspree for static hosting...
if exist "docs\index.html" (
    :: Add a notification about Formspree setup requirements
    echo IMPORTANT: For the contact form to work on GitHub Pages, you will need to:
    echo 1. Create a Formspree.io account
    echo 2. Create a new form in your Formspree account
    echo 3. Replace YOUR_FORMSPREE_FORM_ID in client/src/components/sections/ContactStaticVersion.tsx with your form ID
    echo 4. Rebuild and redeploy the site
    echo.
)

:: Create a CNAME file if you have a custom domain
:: echo yourdomain.com > docs\CNAME

echo.
echo ===== Preparation Complete! =====
echo.
echo Your site is ready for GitHub Pages deployment!
echo.
echo Next steps:
echo 1. Commit and push these changes to GitHub
echo 2. Go to your repository settings
echo 3. Scroll down to the GitHub Pages section
echo 4. Select 'main branch /docs folder' as the source
echo 5. Click Save
echo.
echo Your site will be available at: https://yourusername.github.io/repository-name/
echo.
echo REMINDER: To make the contact form work, set up Formspree as mentioned above.
echo.

pause