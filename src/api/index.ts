import { Loader } from './loader';

export class Api {
  private _context: any;
  public loader: Loader;
  constructor() {
    this.loader = new Loader();
  }
}

// export default new Api();
