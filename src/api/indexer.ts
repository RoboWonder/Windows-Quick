import { inArray } from './search';
export class Indexer {

  private pluginId;
  private items = {};
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
    const keys = Object.keys(this.items);
    for (let i = 0; i < keys.length; i++) {
      const result = inArray(this.get(keys[i]), query);
      if (Array.isArray(result)) {
        this.results.push(...result);
      } else {
        this.results.push(result);
      }
    }
  }
}
