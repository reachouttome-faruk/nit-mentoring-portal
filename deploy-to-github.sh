#!/bin/bash

# NIT Mentoring Portal - GitHub Pages Deployment Script
# This script automates most of the deployment process

set -e

echo "🚀 NIT Mentoring Portal - GitHub Pages Deployment"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.github.json" ]; then
    echo "❌ Error: package.github.json not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Get repository information from user
echo "📝 Step 1: Repository Information"
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name (e.g., nit-mentoring-portal): " REPO_NAME

echo ""
echo "✅ Will deploy to: https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
read -p "Is this correct? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "❌ Cancelled."
    exit 1
fi

# Prepare package.json
echo ""
echo "📦 Step 2: Preparing package files..."
cp package.github.json package.json
rm -f package-lock.json
npm install

# Update vite config with repo name
echo ""
echo "⚙️  Step 3: Updating Vite configuration..."
sed -i.bak "s/const REPO_NAME = '.*'/const REPO_NAME = '$REPO_NAME'/" vite.config.github.ts
rm -f vite.config.github.ts.bak

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo ""
    echo "🔧 Step 4: Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - NIT Mentoring Portal"
fi

# Add remote
echo ""
echo "🔗 Step 5: Setting up GitHub remote..."
REMOTE_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
git remote add origin $REMOTE_URL 2>/dev/null || git remote set-url origin $REMOTE_URL

# Push to GitHub
echo ""
echo "📤 Step 6: Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 Final Steps (Manual):"
echo "1. Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/actions"
echo "2. Enable 'Read and write permissions'"
echo "3. Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
echo "4. Set Source to 'GitHub Actions'"
echo ""
echo "🌐 Your site will be live at:"
echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "⏱️  Wait 2-3 minutes for deployment to complete."
echo ""
