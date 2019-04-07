import { inArray } from './search';
import console = require('console');
import { removeDuplicate } from '@vergo/shared/function';
export class Indexer {

  private pluginId;
  private items = {}  ;
  private results = [];
  constructor() {
  }

  set(key: string, value: any) {
    this.items[key] = value;
  }

  del(key: string) {
    delete this.items[key];
  }

  get(key: string) {
    return this.items[key];
  }

  search(query: string) {
    this.results.length = 0;
    const keys = Object.keys(this.items);
    for (let i = 0; i < keys.length; i++) {
      const result = inArray(this.get(keys[i]), query);
      if (Array.isArray(result)) {
        this.results.push(...result);
      } else {
        this.results.push(result);
      }
    }
    this.results = this.results.sort((a,b) => b.score - a.score);
    return removeDuplicate(this.results, 'primaryText');
  }
}
