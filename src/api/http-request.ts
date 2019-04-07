import * as http from 'http';
import * as https from 'https';
import { parse } from 'url';

interface Data extends http.IncomingMessage {
  data: string;
}

export class HttpRequest{
  private request;
  initRequest(protocol: string){
    this.request = protocol.indexOf('s:') !== -1 ? https.request : http.request;
  }

  load(url){
    const options: any = parse(url);
    this.initRequest(options.protocol);
    return new Promise((resolve: (data: Data) => void, reject) => {
      
      const req = this.request(options, res => {
        let data = '';
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
