export class CMD {
  private context: any;
  constructor(context: any) {
    this.context = context;
  }
  search(query: string) {
    return new Promise((resolve, reject) => {
      let results = [];
      if (results.length === 0) {
        results.push(this.parseItem(query));
      }
      resolve(results);
    })
  }
  execute(url) {
    this.context.shell.runCMD(url);
  }
  parseItem(str: string) {
    return {
      primaryText: `Run ${str}`,
      secondaryText: 'Execute command line',
      url: `C:\\Windows\\System32\\cmd.exe /C ${str}`,
      icon: 'icon://QzpcV2luZG93c1xTeXN0ZW0zMlxjbWQuZXhl',
      plugin: '/',
    }
  }
}
