# Screensnap – Desktop Screenshot Taker

A minimal Electron app that automatically captures a series of desktop screenshots and saves them alongside the app files. It displays simple progress updates in the renderer window while screenshots are taken.

## Features
- Launches a small Electron window and triggers automated screenshot capture on load.
- Saves images as PNG files in the app directory using sequential names like `screenshot-1.png`, `screenshot-2.png`, etc.
- Uses **screenshot-desktop** for cross‑platform screen capture.

## Project structure
- **package.json** — scripts, dependencies, and Electron dev setup.
- **main.js** — Electron main process: creates BrowserWindow and runs the screenshot loop.
- **index.html** — Renderer UI that receives progress messages.

## Prerequisites
- Node.js 18+ and npm installed.

## Install
```bash
# from the project root
npm install
```
Installs Electron as a dev dependency and screenshot-desktop as a runtime dependency.

## Run in development
```bash
npm start
```
Runs Electron via the start script defined in package.json. The app window opens and begins taking screenshots automatically.

## How it works
- Electron main process creates a 500×200 BrowserWindow with Node integration enabled.
- After the renderer finishes loading, main triggers `takeScreenshots(5)`. Adjust the count as needed.
- Each iteration builds a filename like `screenshot-N.png` in the current directory and calls `screenshot({ filename })`.
- Progress and completion messages are sent to the renderer via `webContents.send`. Ensure the renderer subscribes to these channels to display status.

## Configuration
Edit **main.js**:
- **Window size**: change width/height in `new BrowserWindow`.
- **Screenshot count**: change `takeScreenshots(5)` to a desired number.
- **Save location**: replace `path.join(__dirname, ...)` with a custom directory if needed.

## Scripts
- `npm start` — Launch Electron in development.

## Dependencies
- **electron** (devDependency) — App shell/runtime for development.
- **screenshot-desktop** — Captures the desktop to PNG files.

## Known issues and fixes
- If “Cannot find module 'screenshot-desktop'” appears, ensure `npm install` has completed successfully and that screenshot-desktop is listed under **dependencies**, not only devDependencies. Run `npm install` again if needed.
- On Windows, if `npm start` prints “'electron' is not recognized…”, verify Electron is installed locally (devDependency) and use `npm start` which resolves the local binary. Avoid running electron globally unless necessary.

## Security note
Node integration is enabled and contextIsolation is disabled in this sample to keep code minimal; for production apps, disable Node integration and enable contextIsolation, moving privileged logic to the main process or secure preload scripts.

## License
ISC. See package.json.

---

### Quick reference
- **Start**: `npm start`
- **Change screenshot count**: `takeScreenshots(N)`
- **Output files**: `screenshot-1.png …` saved next to the app files
