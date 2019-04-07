import { images } from './images';

export class GoogleSearch{
  private context: any;
  constructor(context: any) {
    this.context = context;
    }

  getSuggestion(filter: string){
  return new Promise(async (resolve: (suggestions: string[]) => void, reject) => {
    const input = filter.trim().toLowerCase();

    if (input === '') {
      return resolve([]);
    }

    try {
      const data = JSON.parse(
        (await this.context.request.load(
          `http://google.com/complete/search?client=chrome&q=${encodeURIComponent(
            input,
          )}`,
        )).data,
      );

      let suggestions: string[] = [];

      for (const item of data[1]) {
        if (suggestions.indexOf(item) === -1) {
          suggestions.push(String(item).toLowerCase());
        }
      }

      // Sort suggestions array by length.
      suggestions = suggestions.sort((a, b) => a.length - b.length).slice(0, 5);

      resolve(suggestions);
    } catch (e) {
      reject(e);
    }
  });
}
  search(query: string){
    return new Promise((resolve, reject) => {
      this.getSuggestion(query).then(data => {
        let results = [];
        for(const item in data){
          results.push(this.parseItem(data[item]));
        }
        resolve(results);
      })
    })
  }
  execute(url){
    this.context.shell.openExternal(url);
  }
  parseItem(str: string){
    return {
      primaryText: str,
      secondaryText: 'Search with Googe',
      url: `https://www.google.com/search?q=${str.replace(/ /g,'+')}`,
      icon: images.GoogleLogo,
      plugin: 'google'
    }
  }
}