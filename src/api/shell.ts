import { shell } from 'electron';
import { exec } from 'child_process';

export const showItemInFolder = (fullPath: string) => {
  shell.showItemInFolder(fullPath);
}
export const openItem = (fullPath: string) => {
  shell.openItem(fullPath);
}
export const openExternal = (fullPath: string) => {
  shell.openExternal(fullPath);
}
export const runCMD = (command: string) {
  exec(command);
}
