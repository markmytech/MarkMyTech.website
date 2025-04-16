@echo off
echo ===== Preparing Mark My Tech Website for GitHub Pages =====
echo.

:: Check if Node.js is installed
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

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
echo Note: Contact form and other backend features will need to be handled differently
echo       for a static site deployment.
echo.

pause