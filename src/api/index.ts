import { Loader } from './loader';
import console = require('console');

export class Api {
  public loader: Loader;
  constructor() {
    this.loader = new Loader();
  }

  public search(query: string) {
    return new Promise(async (resolve, reject) => {
      const keys = Object.keys(this.loader.plugins);
      let result = [];
      for (let i = 0; i < keys.length; i++) {
        if (typeof this.loader.plugins[keys[i]].search !== 'function') {
          result = [...result, ...this.loader.plugins[keys[i]].context.indexer.search(query)];
        }
        else {
          result = [...result, ...await this.loader.plugins[keys[i]].search(query)];
        }
        if (Array.isArray(result) && result.length >= 7) {
          break;
        }
      }

      if (Array.isArray(result)) {
        result = result.slice(0, 7);
        result.forEach((v, k) => {
          v.id = k + 1;
          v.primaryText = v.primaryText.charAt(0).toUpperCase() + v.primaryText.slice(1);
        })
        resolve(result);
      }
    });
  }

  public execute(item){
    this.loader.plugins[item.plugin].execute(item.url);
  }
}