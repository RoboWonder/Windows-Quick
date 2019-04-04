import { BrowserWindow, app, screen, protocol } from 'electron';
import { APP_WIDTH } from '@vergo/shared/constant';
import * as path from 'path';
import console = require('console');
import { startup, execute } from "./file-search/win32";

app.on('ready', () => {
  const { width } = screen.getPrimaryDisplay().workAreaSize;
  let appWidth = width;
  if (width > 1000) {
    appWidth = 1000;
  }
  const x = width / 2 - appWidth / 2;
  const win = new BrowserWindow({
    x,
    y: 100,
    width: appWidth,
    height: 185, // 85,
    show: true,
    transparent: true,
    frame: false,
    // skipTaskbar: true,
    // alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.setBackgroundColor('#00000000');
  win.webContents.openDevTools({ mode: 'detach' });
  win.loadURL('http://localhost:4444/app.html');
  startup();
});
