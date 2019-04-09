import { Results } from './results';
import console = require('console');
import * as React from 'react';
import { Api } from '@vergo/api';
import { ipcRenderer } from 'electron';

export class Controller {
  public inputRef = React.createRef<HTMLInputElement>();
  public resultController = new Results();
  public canComplete = false;
  public pluginApi = new Api();
  private lastInput: string;
  constructor() {
    console.log('new controller');
    
    setInterval(()=>{this.inputRef.current && this.inputRef.current.focus()}, 200);
  }

  private autoComplete(text: string, result: string) {

    const start = text.length;

    const input = this.inputRef.current;

    if (result) {
      if (result.toLowerCase().startsWith(text.toLowerCase())) {
        input.value = text + result.substr(text.length);
      }
      input.setSelectionRange(start, input.value.length);
    }
  }
  public complete() {
    const input = this.inputRef.current;

    if (this.canComplete) {
      this.autoComplete(input.value, this.lastInput);
    }

    this.resultController.load(input).then(result => {
      this.lastInput = result;
      if (this.canComplete) {
        this.autoComplete(
          input.value.substring(0, input.selectionStart),
          result,
        );
        this.canComplete = false;
      }
    });

    this.resultController.selected = 0;
  }

  public execItem(id: number) {
    let item = this.resultController.results[id-1];
    this.pluginApi.execute(item);
  }

  public accept(){
    const input = this.inputRef.current;
    input.value = this.lastInput;
    // input.setSelectionRange(0, 0);
  }
}

export default new Controller();
