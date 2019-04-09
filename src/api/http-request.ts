import * as http from 'http';
import * as https from 'https';
import { parse } from 'url';
import console = require('console');

interface Data extends http.IncomingMessage {
  data: string;
}

export class HttpRequest {
  private request;
  initRequest(protocol: string) {
    this.request = protocol.indexOf('s:') !== -1 ? https.request : http.request;
  }

  load(url: string, Referer?: string, Cookie?: string, userAgent?: string) {
    const options: any = parse(url);
    options.headers = {};
    if (Referer) options.headers.Referer = Referer;
    if (Cookie) options.headers.Cookie = Cookie;
    this.initRequest(options.protocol);
    return new Promise((resolve: (data: Data) => void, reject) => {

      const req = this.request(options, res => {
        let data = '';
        console.log(res.headers);
        res.setEncoding('binary');
        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          const d: any = { ...res, data };
        resolve(d);
        });
      });

      req.on('error', e => {
        reject(e);
      });

      req.end();
    });
  }
}
