import { observable, computed } from 'mobx';
import { Result } from './model';
import controller from '../controller';
import console = require('console');

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
    // input.value.length > 0 && controller.pluginApi.search(input.value);
    return new Promise(async (resolve: (result: string) => void, reject) => {
      const filter = input.value.substring(0, input.selectionStart);
      this.results = filter ? await controller.pluginApi.search(filter) : [];
      this.results.length && (resolve(this.results[0].primaryText), this.selected = 1);
    });
  }
}

// [DMS][GPS] Don't show GPS tracking of Route, which has assigned RMA orders
