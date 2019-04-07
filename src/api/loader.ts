import * as fs from 'fs';
import * as path from 'path';
import console = require('console');
import { getPath } from '@vergo/shared/path';
import { Files } from '@vergo/plugins/files/win32';
import { GoogleSearch } from '@vergo/plugins/google-search';
import { Indexer } from './indexer';
import * as shell from "./shell";
import { HttpRequest } from './http-request';

export class Loader {
  private _loaded: string[] = [];
  public plugins = {};
  constructor(){
    this.mainPlugin();
    // this.load();
  }

  mainPlugin(){
    const _context = {
      indexer: new Indexer(),
      shell: shell,
      request: new HttpRequest(),
    }
    this.plugins['files'] = new Files(_context);
    this.plugins['google'] = new GoogleSearch(_context);
  }
  public load() {
    fs.readdir(pluginPath, (err, dirs) => {
      if (err) return;
      for (let dir in dirs) {
        dir = path.resolve(pluginPath, dir);
        fs.stat(dir, (err, stat) => {
          if (err) {
            console.log(err); return;
          }
          if (stat && stat.isDirectory()) {
            if (this._loaded.indexOf(dir) > -1) return;
            this._loaded.push(dir);
          }
        })
      }
    });
  }
}
