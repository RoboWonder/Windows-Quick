import { resolve } from 'path';
import { remote, app } from 'electron';

export const getPath = (...relativePaths: string[]) => {
  let path: string;

  if (remote) {
    path = remote.app.getPath('appData');
  } else if (app) {
    path = app.getPath('appData');
  } else {
    return null;
  }
  path += '/Vergo/Windows-Quick/'
  return resolve(path, ...relativePaths).replace(/\\/g, '/');
};
