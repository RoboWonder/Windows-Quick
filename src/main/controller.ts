import { Results } from './results';
import console = require('console');
import * as React from 'react';

export class Controller {
  public inputRef = React.createRef<HTMLInputElement>();
  public resultController = new Results();
  public canComplete = false;
  private lastInput: string;
  constructor() {
    console.log('new controller');
  }

  private autoComplete(text: string, result: string) {

    const start = text.length;

    const input = this.inputRef.current;
    console.log(result);

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
}

export default new Controller();
