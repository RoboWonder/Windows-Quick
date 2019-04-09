import { BrowserWindow, app, screen, protocol, ipcMain, Tray, globalShortcut, ipcRenderer } from 'electron';
import * as path from 'path';
import console = require('console');
import { IconCacher } from './icon-cacher';
import * as windowsUtil from '@vergo/api/windows-util';

// import { startup, execute } from "./file-search/win32";
let tray: Tray;
export let win: BrowserWindow;
app.on('ready', () => {
  const { width } = screen.getPrimaryDisplay().workAreaSize;
  let appWidth = width;
  if (width > 1000) {
    appWidth = 1000;
  }
  const x = width / 2 - appWidth / 2;
  win = new BrowserWindow({
    x,
    y: 100,
    width: appWidth,
    height: 500, // 85,
    show: true,
    transparent: true,
    frame: false,
    skipTaskbar: true,
    // alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  ipcMain.on('an-no-di', () => {
    win.hide();
    windowsUtil.restoreFocus();
  });
  win.setBackgroundColor('#00000000');
  win.webContents.openDevTools({ mode: 'detach' });
  win.loadURL('http://localhost:4444/app.html');
  tray = new Tray(path.resolve(app.getAppPath(), 'static/logo.png'))
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  });
  const ret = globalShortcut.register('Alt+Space', () => {
    !win.isVisible() && win.show()
    windowsUtil.saveFocus();
  });
  (new IconCacher());
  // console.log(native);
});
