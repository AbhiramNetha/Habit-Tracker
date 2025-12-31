# 📦 Installation Guide - Me Supreme Habit Tracker

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`

## Step-by-Step Installation

### 1. Extract the ZIP File

```bash
# On Windows
# Right-click the ZIP file → Extract All

# On macOS/Linux
unzip me-supreme-habit-tracker.zip
cd me-supreme-habit-tracker
```

### 2. Install Dependencies

Open a terminal/command prompt in the project directory and run:

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages:
- React 18.2.0
- Recharts 2.10.3
- Lucide React 0.294.0
- Tailwind CSS 3.3.6
- Vite 5.0.0
- And other development dependencies

**Installation time**: ~2-5 minutes depending on your internet speed

### 3. Start the Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

The application will automatically open in your default browser at:
**http://localhost:3000**

If it doesn't open automatically, manually navigate to this URL.

### 4. Start Using the App!

You should see the Me Supreme interface with:
- Glassmorphism design
- Default habits pre-loaded
- Interactive dashboard

## Building for Production

To create an optimized production build:

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

The build files will be in the `dist/` folder.

To preview the production build locally:

```bash
# Using npm
npm run preview

# OR using yarn
yarn preview
```

## Deployment Options

### Option 1: Static Hosting (Recommended)

Deploy the `dist/` folder to:
- **Vercel**: https://vercel.com/
- **Netlify**: https://www.netlify.com/
- **GitHub Pages**: https://pages.github.com/
- **Cloudflare Pages**: https://pages.cloudflare.com/

### Option 2: Self-Hosted

Copy the `dist/` folder to any web server (Apache, Nginx, etc.)

## Common Installation Issues

### Issue: "node: command not found"

**Solution**: Install Node.js from https://nodejs.org/

### Issue: "npm install" fails with permission errors

**Solution (macOS/Linux)**:
```bash
sudo npm install
```

**Solution (Windows)**: Run Command Prompt as Administrator

### Issue: Port 3000 already in use

**Solution**: Either:
1. Stop the application using port 3000
2. Or modify `vite.config.js` to use a different port:
```javascript
server: {
  port: 3001, // Change to any available port
  open: true
}
```

### Issue: Charts not displaying

**Solution**: 
1. Clear browser cache
2. Ensure all dependencies installed correctly:
```bash
npm install recharts lucide-react
```

### Issue: Styles not loading

**Solution**: Rebuild the CSS:
```bash
npm run dev
```
Then hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

## Updating the Application

To update to the latest version:

```bash
# Pull latest changes (if using Git)
git pull origin main

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

## System Requirements

**Minimum:**
- CPU: Dual-core processor
- RAM: 4GB
- Browser: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

**Recommended:**
- CPU: Quad-core processor
- RAM: 8GB
- Modern browser with latest updates

## File Structure After Installation

```
me-supreme-habit-tracker/
├── node_modules/          # Dependencies (auto-generated)
├── dist/                  # Production build (after build)
├── public/               # Static assets
├── src/                  # Source code
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project metadata
├── vite.config.js       # Build config
├── tailwind.config.js   # Tailwind config
└── README.md           # Documentation
```

## Next Steps

1. **Read the README.md** for feature overview
2. **Add your first habit** using the "+ Add Habit" button
3. **Start tracking** by clicking checkboxes
4. **Explore analytics** in different views
5. **Customize** colors and categories to your preference

## Getting Help

If you encounter issues:
1. Check this installation guide
2. Review the README.md file
3. Check browser console for errors (F12)
4. Verify all dependencies are installed correctly

---

**Happy tracking! 🏆**
