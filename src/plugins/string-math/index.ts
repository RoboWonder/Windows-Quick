import { EMPTY_ARRAY } from "mobx/lib/internal";
import console = require("console");

export class StringMath {
  private mulDivPatent = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
  private plusMinPatent = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
  private parsePatent = /(\d)?\s*\(([^()]*)\)\s*/;
  private test = /^\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*$/;
  private current = '';
  private context;

  constructor(context) {
    this.context = context;
  }

  public execute(eq: string) {
    this.current = '';
    let error = '';
    if (typeof eq !== 'string') error = 'The [String] argument is expected.';
    if (eq.search(/([a-zA-Z]+)/) !== -1) error = 'need connect';
    else {
      while (eq.search(this.test) === -1) {
        eq = this.parse(eq);
        if (eq === this.current) error = 'The equation is invalid.';
        this.current = eq;
      }
    }
    console.log(error);
    if (error === '') {
      alert(+eq);
    }
    else {
      this.context.request.load('https://coccoc.com/search');
    }
  }

  public search(eq: string) {
    return [
      {
        primaryText: `Calc: ${eq}`,
        secondaryText: 'Calculator',
        url: eq,
        icon: '',
        plugin: ':',
      },
    ];
  }

  parse(eq: string) {
    while (eq.search(this.parsePatent) !== -1) {
      eq = eq.replace(this.parsePatent, (a, b, c) => {
        c = this.mulDiv(c);
        c = this.plusMin(c);
        return typeof b === 'string' ? `${b}*${c}` : c;
      });
    }
    eq = this.mulDiv(eq);
    eq = this.plusMin(eq);
    return eq;
  }

  mulDiv(eq: string) {
    while (eq.search(this.mulDivPatent) !== -1) {
      eq = eq.replace(this.mulDivPatent, (a) => {
        const sides: RegExpExecArray = this.mulDivPatent.exec(a);
        const result = sides[2] === '*' ? sides[1] * sides[3] : sides[1] / sides[3];
        return result >= 0 ? `+${result}` : result;
      });
    }
    return eq;
  }

  plusMin(eq: string) {
    eq = eq.replace(/([+-])([+-])(\d|\.)/g, (a, b, c, d) => ((b === c ? '+' : '-') + d));
    while (eq.search(this.plusMinPatent) !== -1) {
      eq = eq.replace(this.plusMinPatent, (a) => {
        const sides: RegExpExecArray = this.plusMinPatent.exec(a);
        return sides[2] === '+' ? +sides[1] + +sides[3] : sides[1] - sides[3];
      });
    }
    return eq;
  }

  handleError(err: string) {
    alert(err);
  }
}