# Step 1: Git Setup & GitHub Push - Detailed Guide

## What is Git?

Git is a **version control system** that tracks changes in your code. It's like a save system for your project that:
- Saves snapshots of your code
- Tracks what changed and when
- Allows you to go back to previous versions
- Makes it easy to share code with others

## What is GitHub?

GitHub is a **cloud-based hosting service** for Git repositories. It's where you'll store your code online so you can:
- Share it with others (like submitting your assignment)
- Access it from anywhere
- Deploy it easily

## Prerequisites

Before starting, make sure you have:
1. ✅ Git installed on your computer
2. ✅ A GitHub account (create one at https://github.com if you don't have one)

### Check if Git is installed:

Open your terminal and run:
```bash
git --version
```

If you see a version number (e.g., `git version 2.39.0`), you're good to go!

If not, install Git:
- **Mac**: `brew install git` (if you have Homebrew) or download from https://git-scm.com
- **Windows**: Download from https://git-scm.com/download/win
- **Linux**: `sudo apt-get install git` (Ubuntu/Debian)

---

## Step-by-Step Instructions

### Part A: Initialize Git in Your Project

1. **Open Terminal/Command Prompt**
   - Make sure you're in your project directory: `/Users/shorya/Blog`
   - If not, navigate there: `cd /Users/shorya/Blog`

2. **Initialize Git Repository**
   ```bash
   git init
   ```
   - This creates a hidden `.git` folder in your project
   - This tells Git to start tracking changes in this folder
   - **What you'll see**: `Initialized empty Git repository in /Users/shorya/Blog/.git`

3. **Configure Git (First Time Only)**
   If this is your first time using Git, set your name and email:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
   - Replace with your actual name and email
   - This is used to identify who made each change

4. **Add All Files to Git**
   ```bash
   git add .
   ```
   - The `.` means "all files in the current directory"
   - This stages all your files to be committed
   - **What happens**: Git prepares to save a snapshot of all your files

5. **Create Your First Commit**
   ```bash
   git commit -m "Initial commit: Campusify Blog Assignment"
   ```
   - This creates a snapshot/save point of your code
   - `-m` means "message" - it's a description of what you're saving
   - **What you'll see**: A message showing files were committed

---

### Part B: Create GitHub Repository

1. **Go to GitHub**
   - Open your web browser
   - Go to https://github.com
   - Sign in (or create an account if you don't have one)

2. **Create New Repository**
   - Click the **"+"** icon in the top right corner
   - Select **"New repository"**

3. **Fill in Repository Details**
   - **Repository name**: `campusify-blog` (or any name you prefer)
   - **Description**: "Campusify Blog Assignment - Full Stack Developer Project" (optional)
   - **Visibility**: Choose **Public** (required for assignment submission) or Private
   - **IMPORTANT**: 
     - ❌ **DO NOT** check "Add a README file"
     - ❌ **DO NOT** check "Add .gitignore"
     - ❌ **DO NOT** check "Choose a license"
   - These should be unchecked because your project already has these files!

4. **Click "Create repository"**
   - You'll see a page with instructions
   - **Don't follow those instructions yet** - we'll use different commands

---

### Part C: Connect Local Repository to GitHub

1. **Copy Your Repository URL**
   - On the GitHub page you just created, you'll see a section that says:
     - "Quick setup — if you've done this kind of thing before"
   - Copy the HTTPS URL (it looks like: `https://github.com/YOUR_USERNAME/campusify-blog.git`)
   - Replace `YOUR_USERNAME` with your actual GitHub username

2. **Add Remote Repository (In Terminal)**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/campusify-blog.git
   ```
   - Replace `YOUR_USERNAME` and `campusify-blog` with your actual values
   - This tells Git where to push your code
   - **What you'll see**: (No error message means it worked!)

3. **Verify Remote Was Added**
   ```bash
   git remote -v
   ```
   - This shows you the remote repository URL
   - You should see your GitHub URL listed

4. **Set Main Branch**
   ```bash
   git branch -M main
   ```
   - This renames your branch to "main" (GitHub's standard)
   - **What you'll see**: (No error means it worked!)

---

### Part D: Push Code to GitHub

1. **Push Your Code**
   ```bash
   git push -u origin main
   ```
   - This uploads your code to GitHub
   - `-u` sets up tracking so future pushes are easier
   - **First time?** GitHub will ask you to authenticate:
     - **Option 1**: Use GitHub CLI (if installed)
     - **Option 2**: Use a Personal Access Token (recommended)

2. **Authentication (If Required)**

   **If you see a login prompt:**
   
   **Using Personal Access Token (Recommended):**
   - Username: Your GitHub username
   - Password: Create a Personal Access Token (NOT your GitHub password)
   
   **To create a Personal Access Token:**
   1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   2. Click "Generate new token (classic)"
   3. Name it: "Blog Project"
   4. Select scopes: Check "repo" (this gives access to repositories)
   5. Click "Generate token"
   6. **COPY THE TOKEN** (you won't see it again!)
   7. Use this token as your password when pushing

   **Alternative: Use SSH (More Secure)**
   - Generate SSH key: `ssh-keygen -t ed25519 -C "your.email@example.com"`
   - Add SSH key to GitHub: Settings → SSH and GPG keys → New SSH key
   - Use SSH URL instead: `git remote set-url origin git@github.com:YOUR_USERNAME/campusify-blog.git`

3. **Success!**
   - **What you'll see**: 
     ```
     Enumerating objects: XX, done.
     Counting objects: 100% (XX/XX), done.
     Writing objects: 100% (XX/XX), done.
     To https://github.com/YOUR_USERNAME/campusify-blog.git
      * [new branch]      main -> main
     Branch 'main' set up to track remote branch 'main' from 'origin'.
     ```

4. **Verify on GitHub**
   - Go back to your GitHub repository page
   - Refresh the page
   - You should see all your files there!

---

## Complete Command Sequence (Copy & Paste)

Here's the complete sequence of commands (replace YOUR_USERNAME and repository name):

```bash
# Navigate to project directory (if not already there)
cd /Users/shorya/Blog

# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Campusify Blog Assignment"

# Add GitHub repository (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/campusify-blog.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Troubleshooting

### Error: "fatal: not a git repository"
- **Solution**: Make sure you're in the project directory: `cd /Users/shorya/Blog`
- Then run `git init` again

### Error: "remote origin already exists"
- **Solution**: Remove the existing remote first:
  ```bash
  git remote remove origin
  ```
- Then add it again with the correct URL

### Error: "Authentication failed" or "Permission denied"
- **Solution**: 
  - Make sure you're using a Personal Access Token (not password)
  - Or set up SSH keys
  - Or use GitHub Desktop (easier GUI option)

### Error: "src refspec main does not match any"
- **Solution**: Make sure you've committed files first:
  ```bash
  git add .
  git commit -m "Initial commit"
  ```

### Want to see what will be committed?
- **Before committing**: `git status` - Shows which files are staged/changed
- **After committing**: `git log` - Shows commit history

---

## Alternative: Use GitHub Desktop (Easier for Beginners)

If you find the command line confusing, you can use GitHub Desktop:

1. **Download GitHub Desktop**: https://desktop.github.com
2. **Sign in** with your GitHub account
3. **Click**: "File" → "Add Local Repository"
4. **Select** your `/Users/shorya/Blog` folder
5. **Click**: "Publish repository"
6. **Choose** repository name and visibility
7. **Click**: "Publish Repository"

Done! Much easier, but learning command line Git is valuable too.

---

## What's Next?

Once your code is on GitHub:
1. ✅ Step 1 Complete!
2. Move to **Step 2**: Deploy to Vercel (see NEXT_STEPS.md)
3. Your GitHub repository URL is: `https://github.com/YOUR_USERNAME/campusify-blog`

Good luck! 🚀

