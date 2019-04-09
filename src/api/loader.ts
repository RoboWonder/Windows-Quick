import * as fs from 'fs';
import * as path from 'path';
import console = require('console');
import { Files } from '@vergo/plugins/files/win32';
import { GoogleSearch } from '@vergo/plugins/google-search';
import { CMD } from '@vergo/plugins/cmd';
import { Help } from '@vergo/plugins/help';
import { StringMath } from '@vergo/plugins/string-math';

export class Loader {
  private _loaded: string[] = [];
  private context: any;
  public plugins = {};
  constructor(context: any) {
    this.context = context;
    this.mainPlugin();
    // this.load();
  }

  mainPlugin() {
    this.plugins['files'] = new Files(this.context);
    this.plugins['google'] = new GoogleSearch(this.context);
    this.plugins['>'] = new CMD(this.context);
    this.plugins['?'] = new Help(this.context);
    this.plugins[':'] = new StringMath(this.context);
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
