import { ipcRenderer } from "electron";

export const Hide = () => {
  ipcRenderer.send('an-no-di', []);
}