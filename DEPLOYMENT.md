# 🚀 AI Maturity Assessment Tool - Deployment Guide

## 📦 Package Contents

This deployment package includes:

1. **ai-maturity-assessment.jsx** - Main React component (140KB)
2. **ai-maturity-assessment-standalone.html** - Standalone HTML loader
3. **README.md** - Complete documentation
4. **DEPLOYMENT.md** - This file

## ✅ Quick Start (Easiest Method)

### Option 1: Python HTTP Server (Recommended)

1. Download all files to a directory
2. Open terminal/command prompt in that directory
3. Run:
   ```bash
   python3 -m http.server 8000
   ```
4. Open browser to: `http://localhost:8000/ai-maturity-assessment-standalone.html`

### Option 2: Node.js HTTP Server

1. Install http-server if you haven't:
   ```bash
   npm install -g http-server
   ```
2. In the files directory, run:
   ```bash
   http-server -p 8000
   ```
3. Open browser to: `http://localhost:8000/ai-maturity-assessment-standalone.html`

### Option 3: Visual Studio Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `ai-maturity-assessment-standalone.html`
3. Select "Open with Live Server"

## 🎯 What You Get

### Phase 1 Features (Complete)
- ✅ 8 practice area frameworks
- ✅ 3-dimensional maturity tracking (Capability, AFD, DPI)
- ✅ Treemap heatmap visualization
- ✅ Streamgraph evolution over time
- ✅ Practice deep-dive with radar charts
- ✅ Leadership goals & milestones
- ✅ Fiscal quarter support (Q1=Apr-Jun)

### Phase 2 Features (Complete)
- ✅ Competitor benchmarking overlay
- ✅ 3 pre-loaded competitor datasets
- ✅ Practice comparison matrix with sorting/filtering
- ✅ Export framework (PDF/PPT buttons)
- ✅ Stage-level maturity heatmap

### Phase 3 Features (NEW!)
- ✅ **Snapshot functionality**
- ✅ Save unlimited historical snapshots
- ✅ Compare current state vs any snapshot
- ✅ Load previous snapshots
- ✅ Track progress over time

## 🔧 Troubleshooting

### Issue: Blank white screen
**Solution:** Make sure you're serving the files via HTTP, not opening them directly (file://)

### Issue: "Module not found" or JavaScript errors
**Solution:** Check that both `.html` and `.jsx` files are in the same directory

### Issue: Components not loading
**Solution:** Check browser console (F12) for errors. Make sure you have internet connection (for CDN libraries)

### Issue: Slow loading
**Solution:** First load may take 5-10 seconds to download libraries from CDN. Subsequent loads will be cached.

## 📊 Usage Guide

### Saving Snapshots
1. Click green "Save Snapshot" button in header or Overview tab
2. Enter a descriptive name (e.g., "Q1 FY2026 Review")
3. Snapshot is automatically saved with current data

### Comparing with Snapshots
1. Toggle "vs Snapshot" in Overview Dashboard
2. Select which snapshot to compare against
3. See deltas in treemap badges and metrics

### Competitor Benchmarking
1. Toggle "Show Competitor" in Overview or Compare tabs
2. Select competitor (Industry Leader A, Industry Average, or Competitor C)
3. View side-by-side comparisons

### Exporting Reports
1. Click "Export PDF" or "Export PPT" buttons
2. Currently shows placeholder - implement with jsPDF/PptxGenJS for production

## 🎨 Customization

### Adding Your Own Competitors
Edit the `competitors` object in the code:

```javascript
const [competitors, setCompetitors] = useState({
  'your-competitor': {
    name: 'Your Competitor Name',
    overallCapability: 2.8,
    overallAFD: 55,
    overallDPI: 2.5,
    practiceScores: {
      'modern-apps': { capability: 3.0, afd: 58, dpi: 3 },
      // ... add all 8 practices
    }
  }
});
```

### Changing Brand Colors
The app uses Tailwind CSS. Main colors are:
- Primary Blue: `bg-blue-600`, `text-blue-400`
- Cyan Accent: `bg-cyan-400`, `text-cyan-400`
- Dark Background: `bg-slate-900`, `from-slate-950`

### Modifying Practice Frameworks
Edit the `practiceFrameworks` object to customize stages for each practice.

## 💾 Data Persistence

**Important:** This version stores data in browser memory only. When you refresh the page, data resets to defaults.

To add persistence:
1. Implement localStorage to save/load state
2. Add export/import JSON functionality
3. Connect to a backend API/database

Example localStorage save:
```javascript
localStorage.setItem('maturityData', JSON.stringify(practicesData));
```

## 🌐 Production Deployment

### For Internal Use (Intranet)
1. Upload files to your web server
2. Configure proper MIME types for .jsx files
3. Add HTTPS if handling sensitive data

### For External Hosting
Consider these platforms:
- **Netlify**: Drag & drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free static hosting
- **AWS S3 + CloudFront**: Enterprise solution

### Security Considerations
- This tool has no authentication - add auth for production
- Consider data encryption for sensitive benchmarks
- Implement audit logging for compliance
- Use environment variables for competitor data

## 📞 Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review browser console (F12) for error messages
3. Ensure all files are in the same directory
4. Verify internet connection for CDN libraries

## 🔄 Updates & Versioning

**Current Version:** 3.0 (Phase 3 Complete)

To update:
1. Download new .jsx file
2. Replace old file
3. Clear browser cache (Ctrl+Shift+R)
4. Reload page

---

**Built with:** React 18 + Recharts + Tailwind CSS  
**Last Updated:** January 2026  
**Status:** Production Ready
