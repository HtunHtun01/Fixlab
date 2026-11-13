# FIXLAB — Phone Repair Shop Simulator 3D (V2.0)

A mobile-friendly, browser-based phone repair shop management game. It includes an isometric-style shop scene, customer queue, repair task mini-game, inventory, upgrades, staff hiring, XP/levels, daily challenge, view controls, and browser save.

## Files
- `index.html` — app layout
- `style.css` — responsive interface and isometric-style shop
- `game.js` — game rules and local save system
- `README.md` — this guide
- `LICENSE.txt` — MIT license

## Run locally
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge, Firefox, or Safari.
3. Tap **Call next customer**.
4. Open **Repair desk**, finish the repair steps in order, and complete the job.
5. Buy parts in **Parts inventory** when stock runs out.
6. Use upgrades and staff hiring to grow the shop.

No npm, build process, or backend is required. Internet is only used for optional Google Fonts; the game itself runs locally.

## Publish to GitHub Pages
1. Create a repository, for example `phone-repair-shop-simulator`.
2. Upload `index.html`, `style.css`, `game.js`, `README.md`, and `LICENSE.txt` to the repository root.
3. Open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
5. Wait for deployment. Your URL will be `https://YOUR-USERNAME.github.io/phone-repair-shop-simulator/`.

For a user-site repository named `YOUR-USERNAME.github.io`, the URL is `https://YOUR-USERNAME.github.io/`.

## Controls and systems
- Call next customer: generate a random repair job.
- Repair desk / tap shop scene: open an active repair.
- Repair tasks: tap each task in order, then complete the job.
- Parts inventory: buy screen, battery, port, speaker, camera, and tool kit stock.
- Shop upgrades: unlock shop tiers and a repair-income bonus.
- Staff room: hire a technician for a one-time fee and daily wage.
- Daily challenge: complete two repairs and claim $100.
- Rotate view / zoom: adjust the scene presentation.
- Language: switch English / Myanmar interface label.
- Save: saves locally; Reset starts a new game.
- Double-click the Day number: close the day when no repair orders are pending.

## Save data
Progress is stored in the browser's `localStorage` on the current device and browser. It does not automatically sync across devices. Clearing site data or using private browsing can remove the save.

## Important
This is a fictional game simulation. Repair tasks are abstract game actions and are not real-world device repair instructions. The shop scene uses CSS perspective and layered artwork rather than a full 3D engine.
