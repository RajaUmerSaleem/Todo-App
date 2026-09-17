// main.js
import { app, BrowserWindow } from 'electron';
import process from 'process';
function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For electron-store and require in renderer
    }
  });

  win.loadURL('http://localhost:5173'); // Use your dev server during development
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});