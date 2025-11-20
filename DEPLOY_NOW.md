# 🚀 Deploy NOW - Automated Script

I've created an automated deployment script that does 90% of the work for you.

## What You Need

1. **GitHub account** (free at github.com)
2. **Create a new PUBLIC repository** at github.com/new
3. **Download this project** from Replit (⋮ menu → Download as zip)
4. **Git and Node.js** installed on your computer

## One Command Deployment

### On Mac/Linux:
```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

### On Windows:
```bash
deploy-to-github.bat
```

## What the Script Does Automatically

✅ Replaces package.json with frontend-only version  
✅ Regenerates package-lock.json  
✅ Updates Vite config with your repo name  
✅ Initializes Git repository  
✅ Commits all files  
✅ Pushes to GitHub  

## What You Do Manually (2 clicks)

After the script finishes:

1. **Enable GitHub Actions:**
   - Go to the link the script shows you
   - Click "Read and write permissions" → Save

2. **Enable GitHub Pages:**
   - Go to the second link
   - Select "GitHub Actions" → Save

## Done!

Your site will be live in 2-3 minutes at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## Can't Run Scripts?

If you can't run the automated script, follow the manual steps in `QUICK_START.md` instead.

---

**This is the easiest way to deploy to GitHub Pages!** 🎉
