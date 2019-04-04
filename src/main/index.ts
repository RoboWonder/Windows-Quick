import { BrowserWindow, app, screen } from 'electron';
import { APP_WIDTH } from '@vergo/shared/constant';
import { Results } from './results';
import console = require('console');
// import * as NodeRT from '@nodert-win10-rs4/windows.applicationmodel.search/bin/win32-x64-69';
declare function require(name:string);
const { SearchPane } = require('@nodert-win10-rs4/windows.applicationmodel.search/lib/NodeRT_Windows_ApplicationModel_Search.d');

app.on('ready', () => {
  // console.log(NodeRT);
  const windows  = new SearchPane();
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

});
