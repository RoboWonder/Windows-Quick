import * as fs from 'fs';
import * as path from 'path';
import console = require('console');
import { getPath } from '@vergo/shared/path';
import { Files } from '@vergo/plugins/files/win32';
import { Indexer } from './indexer';

export class Loader {
  private _loaded: string[] = [];
  private _plugins = {};
  constructor(){
    this.mainPlugin();
    // this.load();
  }

  public getPlugins(id){
    return this._plugins[id];
  }

  mainPlugin(){
    const _context = {
      indexer: new Indexer(),
    }
    this._plugins['files'] = new Files(_context);
  }
  public load() {
    console.log(getPath('haha'));
    fs.readdir(pluginPath, (err, dirs) => {
      if (err) return;
      console.log('dir', dirs);
      for (let dir in dirs) {
        console.log('dir', dirs);
        dir = path.resolve(pluginPath, dir);
        fs.stat(dir, (err, stat) => {
          if (err) {
            console.log(err); return;
          }
          if (stat && stat.isDirectory()) {
            if (this._loaded.indexOf(dir) > -1) return;
            this._loaded.push(dir);
            console.log('load', this._loaded);
          }
        })
      }
    });
  }
}
