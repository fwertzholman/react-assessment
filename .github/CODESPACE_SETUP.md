# 🚀 GitHub Codespaces Setup Guide

This assessment runs in GitHub Codespaces, providing candidates with a pre-configured development environment at no cost to them.

## 💰 Billing Information

### **For Assessment Administrators**
- **You pay for Codespace usage** (repository owner)
- **Cost**: ~$0.18/hour for 2-core machines
- **Auto-stop**: Codespaces stop after 30 minutes of inactivity
- **Estimated cost per candidate**: $1-3 for typical 2-6 hour assessment

### **For Candidates**
- **Completely free** - no GitHub billing required
- **No local setup needed** - just a web browser
- **No installation** of Node.js, npm, or development tools

## ✅ What's Pre-Configured

- **Node.js 22** with npm
- **React + Vite** development server
- **Playwright** e2e testing with browsers
- **VS Code** with assessment-specific extensions
- **Port 3000** automatically forwarded

## 🎯 Quick Start for Candidates

### **1. Open in Codespace**
1. Click **"Code"** button on the repository
2. Select **"Codespaces"** tab  
3. Click **"Create codespace on main"**
4. Wait 2-3 minutes for setup

### **2. Verify Setup**
```bash
# Start development server
npm run dev

# Run tests to see requirements  
npm run test:e2e:headed
```

### **3. Begin Assessment**
Follow the test outcomes step by step:
```bash
# Test each outcome as you implement
npm run test:e2e -- getting-started
npm run test:e2e -- outcome-1a
npm run test:e2e -- outcome-1b
# ... etc
```

## 🧪 Testing Commands

```bash
# Visual test runner
npm run test:e2e:headed

# Interactive UI mode
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Test specific outcomes
npm run test:e2e -- outcome-1a
```

## 📱 Accessing Your Application

Your React app will be available on **port 3000** - Codespaces automatically provides a preview link.

## 🐛 Troubleshooting

### **If Setup Fails**
```bash
# Reinstall dependencies
npm install

# Install Playwright browsers
npm run test:e2e:install
```

### **VS Code Issues**
- Use Ctrl+Shift+P → "Developer: Reload Window"
- Extensions should install automatically

## 🎯 Assessment Flow

1. **Codespace starts** (~2-3 minutes)
2. **Explore existing code** (App.jsx, components)
3. **Run tests** to understand requirements
4. **Implement features** following assessment outcomes
5. **Validate with tests** - all passing = complete!

The environment eliminates setup friction so candidates focus entirely on the assessment!