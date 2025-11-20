@echo off
REM NIT Mentoring Portal - GitHub Pages Deployment Script (Windows)

echo ========================================
echo NIT Mentoring Portal - GitHub Pages
echo ========================================
echo.

REM Check if package.github.json exists
if not exist "package.github.json" (
    echo Error: package.github.json not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

REM Get repository information
echo Step 1: Repository Information
echo.
set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter your repository name (e.g., nit-mentoring-portal): "

echo.
echo Will deploy to: https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo.
set /p CONFIRM="Is this correct? (y/n): "

if /i not "%CONFIRM%"=="y" (
    echo Cancelled.
    pause
    exit /b 1
)

REM Prepare package files
echo.
echo Step 2: Preparing package files...
copy /y package.github.json package.json
if exist package-lock.json del package-lock.json
call npm install

REM Update vite config
echo.
echo Step 3: Updating Vite configuration...
powershell -Command "(Get-Content vite.config.github.ts) -replace \"const REPO_NAME = '.*'\", \"const REPO_NAME = '%REPO_NAME%'\" | Set-Content vite.config.github.ts"

REM Initialize git if needed
if not exist ".git" (
    echo.
    echo Step 4: Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - NIT Mentoring Portal"
)

REM Add remote
echo.
echo Step 5: Setting up GitHub remote...
set REMOTE_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
git remote add origin %REMOTE_URL% 2>nul || git remote set-url origin %REMOTE_URL%

REM Push to GitHub
echo.
echo Step 6: Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Code pushed to GitHub successfully!
echo ========================================
echo.
echo Final Steps (Manual):
echo 1. Go to: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/settings/actions
echo 2. Enable 'Read and write permissions'
echo 3. Go to: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/settings/pages
echo 4. Set Source to 'GitHub Actions'
echo.
echo Your site will be live at:
echo https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo.
echo Wait 2-3 minutes for deployment to complete.
echo.
pause
