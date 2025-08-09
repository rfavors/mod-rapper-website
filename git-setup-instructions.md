# Git Repository Setup Instructions

## Option 1: Create Repository on GitHub (Recommended)

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top right corner and select "New repository"
3. **Repository settings:**
   - Repository name: `mod-rapper-website`
   - Description: `Modern website for M.O.D! rapper with gritty street-inspired design`
   - Set to Public (recommended for portfolio)
   - Do NOT initialize with README (we already have files)
4. **Click "Create repository"**

## Option 2: Initialize Local Git Repository

Open terminal/command prompt in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: M.O.D! rapper website with Docker deployment setup"

# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/mod-rapper-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Option 3: Using GitHub CLI (if installed)

```bash
# Create repository and push
gh repo create mod-rapper-website --public --description "Modern website for M.O.D! rapper with gritty street-inspired design"
git init
git add .
git commit -m "Initial commit: M.O.D! rapper website with Docker deployment setup"
git remote add origin https://github.com/YOUR_USERNAME/mod-rapper-website.git
git push -u origin main
```

## Files Ready for Deployment

Your repository will contain:
- `index.html` - Main website file
- `styles.css` - Styling and design
- `script.js` - Interactive features
- `Dockerfile` - Docker configuration
- `docker-compose.yml` - Docker Compose setup
- `README.md` - Coolify deployment instructions
- `.dockerignore` - Docker build optimization

## Next Steps After Pushing

1. **Verify deployment files** are in the repository
2. **Follow README.md** for Coolify deployment
3. **Update repository description** and add topics like: `rapper`, `website`, `docker`, `nginx`
4. **Enable GitHub Pages** (optional) for additional hosting

## Troubleshooting

- If you get permission errors, make sure you're authenticated with GitHub
- If remote already exists, use `git remote set-url origin https://github.com/YOUR_USERNAME/mod-rapper-website.git`
- For authentication issues, consider using SSH instead of HTTPS