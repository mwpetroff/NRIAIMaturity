AI Maturity Assessment Tool

Overview
- This repository contains a standalone UI for an AI maturity assessment.
- Key files:
  - `ai-maturity-assessment-standalone.html` — standalone HTML loader (ready to open)
  - `ai-maturity-assessment.jsx` — main React component/source
  - `DEPLOYMENT.md` — deployment and troubleshooting notes

Quick start
- Easiest: open `ai-maturity-assessment-standalone.html` in a browser.
- Recommended (serve via HTTP):
  - Python (works on Windows if Python installed):

```powershell
cd path\to\NRIAIMaturity
python -m http.server 8000
# then open http://localhost:8000/ai-maturity-assessment-standalone.html
```

  - Node (http-server):

```powershell
npm install -g http-server
cd path\to\NRIAIMaturity
http-server -p 8000
# then open http://localhost:8000/ai-maturity-assessment-standalone.html
```

Notes
- The HTML uses CDN versions of React, Recharts, Tailwind and Babel to transpile the `.jsx` in-browser. For production, prebuild/bundle the `.jsx` and serve static JS.
- Data is held in browser memory; refresh clears state. See `DEPLOYMENT.md` for persistence suggestions.
- If you see a blank page, serve files over HTTP (do not open `file://` directly).

Next steps I can take
- Create a minimal `package.json` + build script to bundle the JSX into a production JS file.
- Add simple persistence (localStorage) to preserve snapshots across reloads.
- Deploy to GitHub Pages / Netlify (I can create configs).

Files
- See full docs: [NRIAIMaturity/DEPLOYMENT.md](NRIAIMaturity/DEPLOYMENT.md)

Created by assistant — January 15, 2026
