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

:: Copy public/index.html to the root for better compatibility
echo Creating a proper index.html in the root...
if exist "docs\public\index.html" (
    copy docs\public\index.html docs\index.html
)

:: Fix the asset paths in index.html files for GitHub Pages compatibility
echo Fixing asset paths for GitHub Pages...
if exist "docs\index.html" (
    :: Create a PowerShell script to fix the paths
    echo $content = Get-Content -Path "docs\index.html" -Raw > fix_paths.ps1
    echo $content = $content -replace 'src="/assets/', 'src="./public/assets/' >> fix_paths.ps1
    echo $content = $content -replace 'href="/assets/', 'href="./public/assets/' >> fix_paths.ps1
    echo Set-Content -Path "docs\index.html" -Value $content >> fix_paths.ps1
    
    :: Run the PowerShell script
    powershell -ExecutionPolicy Bypass -File fix_paths.ps1
    del fix_paths.ps1
)

if exist "docs\public\index.html" (
    :: Create a PowerShell script to fix the paths in public/index.html
    echo $content = Get-Content -Path "docs\public\index.html" -Raw > fix_paths.ps1
    echo $content = $content -replace 'src="/assets/', 'src="./assets/' >> fix_paths.ps1
    echo $content = $content -replace 'href="/assets/', 'href="./assets/' >> fix_paths.ps1
    echo Set-Content -Path "docs\public\index.html" -Value $content >> fix_paths.ps1
    
    :: Run the PowerShell script
    powershell -ExecutionPolicy Bypass -File fix_paths.ps1
    del fix_paths.ps1
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

:: Create a 404.html file for GitHub Pages to support client-side routing
echo Creating 404.html for client-side routing support...
echo ^<!DOCTYPE html^> > docs\404.html
echo ^<html^> >> docs\404.html
echo ^<head^> >> docs\404.html
echo   ^<meta charset="utf-8"^> >> docs\404.html
echo   ^<title^>Mark My Tech^</title^> >> docs\404.html
echo   ^<script type="text/javascript"^> >> docs\404.html
echo     // Single Page Apps for GitHub Pages >> docs\404.html
echo     // MIT License >> docs\404.html
echo     // https://github.com/rafgraph/spa-github-pages >> docs\404.html
echo     // This script takes the current url and converts the path and query >> docs\404.html
echo     // string into just a query string, and then redirects the browser >> docs\404.html
echo     // to the new url with only a query string and hash fragment, >> docs\404.html
echo     // e.g. https://www.foo.tld/one/two?a=b^&c=d#qwe, becomes >> docs\404.html
echo     // https://www.foo.tld/?/one/two^&a=b~and~c=d#qwe >> docs\404.html
echo     // Note: this 404.html file must be at least 512 bytes for it to work >> docs\404.html
echo     // with Internet Explorer (it is currently ^> 512 bytes) >> docs\404.html
echo. >> docs\404.html
echo     // If you're creating a Project Pages site and NOT using a custom domain, >> docs\404.html
echo     // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to ^> 1). >> docs\404.html
echo     // This way the code will only replace the route part of the path, and not >> docs\404.html
echo     // the real directory in which the app resides, for example: >> docs\404.html
echo     // https://username.github.io/repo-name/one/two?a=b^&c=d#qwe, becomes >> docs\404.html
echo     // https://username.github.io/repo-name/?/one/two^&a=b~and~c=d#qwe >> docs\404.html
echo     // Otherwise, leave pathSegmentsToKeep as 0. >> docs\404.html
echo     var pathSegmentsToKeep = 1; >> docs\404.html
echo. >> docs\404.html
echo     var l = window.location; >> docs\404.html
echo     l.replace( >> docs\404.html
echo       l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + >> docs\404.html
echo       l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' + >> docs\404.html
echo       l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/^&/g, '~and~') + >> docs\404.html
echo       (l.search ? '^&' + l.search.slice(1).replace(/^&/g, '~and~') : '') + >> docs\404.html
echo       l.hash >> docs\404.html
echo     ); >> docs\404.html
echo   ^</script^> >> docs\404.html
echo ^</head^> >> docs\404.html
echo ^<body^> >> docs\404.html
echo ^</body^> >> docs\404.html
echo ^</html^> >> docs\404.html

:: Add redirect script to index.html
echo Adding routing script to index.html...
if exist "docs\index.html" (
    :: Create a PowerShell script to add the routing script
    echo $content = Get-Content -Path "docs\index.html" -Raw > add_routing_script.ps1
    echo $routingScript = @" >> add_routing_script.ps1
    echo ^<!-- Start Single Page Apps for GitHub Pages --^> >> add_routing_script.ps1
    echo ^<script type="text/javascript"^> >> add_routing_script.ps1
    echo   // Single Page Apps for GitHub Pages >> add_routing_script.ps1
    echo   // MIT License >> add_routing_script.ps1
    echo   // https://github.com/rafgraph/spa-github-pages >> add_routing_script.ps1
    echo   // This script checks to see if a redirect is present in the query string, >> add_routing_script.ps1
    echo   // converts it back into the correct url and adds it to the >> add_routing_script.ps1
    echo   // browser's history using window.history.replaceState(...), >> add_routing_script.ps1
    echo   // which won't cause the browser to attempt to load the new url. >> add_routing_script.ps1
    echo   // When the single page app is loaded further down in this file, >> add_routing_script.ps1
    echo   // the correct url will be waiting in the browser's history for >> add_routing_script.ps1
    echo   // the single page app to route accordingly. >> add_routing_script.ps1
    echo   (function(l) { >> add_routing_script.ps1
    echo     if (l.search[1] === '/' ) { >> add_routing_script.ps1
    echo       var decoded = l.search.slice(1).split('^&').map(function(s) { >> add_routing_script.ps1
    echo         return s.replace(/~and~/g, '^&') >> add_routing_script.ps1
    echo       }).join('?'); >> add_routing_script.ps1
    echo       window.history.replaceState(null, null, >> add_routing_script.ps1
    echo           l.pathname.slice(0, -1) + decoded + l.hash >> add_routing_script.ps1
    echo       ); >> add_routing_script.ps1
    echo     } >> add_routing_script.ps1
    echo   }(window.location)) >> add_routing_script.ps1
    echo ^</script^> >> add_routing_script.ps1
    echo ^<!-- End Single Page Apps for GitHub Pages --^> >> add_routing_script.ps1
    echo "@ >> add_routing_script.ps1
    echo $content = $content -replace '</head>', "$routingScript`n</head>" >> add_routing_script.ps1
    echo Set-Content -Path "docs\index.html" -Value $content >> add_routing_script.ps1
    
    :: Also add to public/index.html if it exists
    echo if (Test-Path "docs\public\index.html") { >> add_routing_script.ps1
    echo   $contentPublic = Get-Content -Path "docs\public\index.html" -Raw >> add_routing_script.ps1
    echo   $contentPublic = $contentPublic -replace '</head>', "$routingScript`n</head>" >> add_routing_script.ps1
    echo   Set-Content -Path "docs\public\index.html" -Value $contentPublic >> add_routing_script.ps1
    echo } >> add_routing_script.ps1
    
    :: Run the PowerShell script
    powershell -ExecutionPolicy Bypass -File add_routing_script.ps1
    del add_routing_script.ps1
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