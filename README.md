# FIXLAB Phone Repair Shop Simulator V3.0

A mobile-friendly 3D shop-management game using HTML, CSS, JavaScript and Three.js.

## Features
- Real Three.js 3D shop scene (not a CSS-only isometric mockup)
- Drag to rotate; mouse wheel to zoom
- Customer queue and phone repair orders
- Step-based repair mini-game
- Screen, battery and charging-port stock
- Cash, levels, reputation, daily bonuses
- Shop upgrades, assistant hiring and browser auto-save
- Responsive phone and desktop UI

## Run locally
The game uses JavaScript ES modules. Do not open `index.html` directly with `file://`.

Run a local server in this folder:
```bash
python -m http.server 8000
```
Open `http://localhost:8000`.

Alternatively use VS Code Live Server.

## GitHub Pages
1. Create a GitHub repository.
2. Upload all four project files to the repository root.
3. Open Settings → Pages.
4. Select Deploy from a branch, choose `main` and `/ (root)`, then Save.
5. Visit the published Pages URL.

## Requirements and notes
- Internet connection required: Three.js and Google Fonts are loaded from CDNs.
- Modern browser with WebGL support required.
- Progress is stored in localStorage on the current browser/device; it does not sync.
- This is a game prototype, not a real electronics repair guide. Repair steps are fictional gameplay tasks.
- Some menu items and advanced simulation systems are planned for later updates.

## Controls
Drag scene to rotate; mouse wheel to zoom. Accept an order, advance each repair step, restock parts, upgrade the shop, and end the day.
