const { app, BrowserWindow } = require('electron');
const path = require('path');
const screenshot = require('screenshot-desktop');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  // Start taking screenshots when the window is ready
  win.webContents.on('did-finish-load', () => {
    takeScreenshots(5); // change 5 to any number you want
  });
}

async function takeScreenshots(count) {
  for (let i = 1; i <= count; i++) {
    const filePath = path.join(__dirname, `screenshot-${i}.png`);
    await screenshot({ filename: filePath });

    // Update UI
    win.webContents.send('screenshot-progress', `📸 Taking screenshot ${i} of ${count}`);
  }

  // Final message
  win.webContents.send('screenshot-done', `✅ Finished! ${count} screenshots saved.`);
}

app.whenReady().then(createWindow);
