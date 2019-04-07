import { shell } from "electron";

export const showItemInFolder = (fullPath: string) => {
  shell.showItemInFolder(fullPath);
}
export const openItem = (fullPath: string) => {
  shell.openItem(fullPath);
}
export const openExternal = (fullPath: string) => {
  shell.openExternal(fullPath);
}