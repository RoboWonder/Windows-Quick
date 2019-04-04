import { observable, computed } from 'mobx';
import { Result } from './model';

export class Results {

  @observable
  public results: Result[] = [];

  @observable
  public selected = 0;

  @computed
  public get visible() {
    return this.results.length > 0;
  }
  public load(input: HTMLInputElement) {
    return new Promise(async (resolve: (result: string) => void, reject) => {
      const filter = input.value.substring(0, input.selectionStart);
      resolve('Visual Studio Code');
      this.results = [{
        primaryText: 'Visual Studio Code',
        secondaryText: 'Desktop app',
        id: 1,
        icon: 'https://www.bing.com/th?id=OIP.lTKtXsFjBhmO8oKSH0jbNAHaFV&w=217&h=160&c=7&o=5&dpr=1.25&pid=1.7'
      }];
    });
  }
}

// [DMS][GPS] Don't show GPS tracking of Route, which has assigned RMA orders
