import { Loader } from './loader';
import { Indexer } from './indexer';
import * as shell from './shell';
import { HttpRequest } from './http-request';
import * as app from './app';

export class Api {
  public loader: Loader;
  private slug = ['@', '\\', '/', '>', '?', ':'];
  constructor() {

    const _context = {
      indexer: new Indexer(),
      shell,
      request: new HttpRequest(),
      app,
    }

    this.loader = new Loader(_context);
  }

  public search(query: string) {
    return new Promise(async (resolve, reject) => {
      const keys = Object.keys(this.loader.plugins);
      const slug = query.charAt(0);
      let result = [];
      if (this.slug.includes(slug) && this.loader.plugins.hasOwnProperty(slug)) {
        query = query.substr(1);
        result = await this.loader.plugins[slug].search(query);
      }
      else {
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

  public execute(item) {
    this.loader.plugins[item.plugin].execute(item.url);
  }
}
