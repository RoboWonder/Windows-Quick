import * as http from 'http';
import * as https from 'https';
import { parse } from 'url';
import console = require('console');
import request = require('request');
import FileCookieStore = require('tough-cookie-filestore');
import { getPath } from '@vergo/shared/path';

interface Data extends http.IncomingMessage {
  data: string;
}

export class HttpRequest {
  private cookie: any = {};
  load(url: string, Referer?: string, Cookie?: string, userAgent?: string) {
    let _jar = request.jar(new FileCookieStore(getPath('cookies.json')));
    let _request = request.defaults({ jar: _jar });
    const options: any = parse(url);



    /* if (!this.cookie.hasOwnProperty(options.host)) {

    } */
    // options.headers = {};
    // if (Referer) options.headers.Referer = Referer;
    // if (Cookie) options.headers.Cookie = Cookie;
    // this.initRequest(options.protocol);
    return new Promise((resolve: (data: Data) => void, reject) => {
      const req = request({ url, jar: _jar }, (error, res, body) => {
        console.log(`${options.protocol}//${options.host}`);
        console.log(_jar.getCookieString(`${options.protocol}//${options.host}`));


      }).on('response', function (response) {
        // unmodified http.IncomingMessage object
        response.setEncoding('binary');
        response.on('data', function (data) {
          // compressed data as it is received
          resolve({ data });
        })
      });
      req.on('error', e => {
        reject(e);
      });

      req.end();
    });
  }
}
