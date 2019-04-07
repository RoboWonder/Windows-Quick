import { protocol } from "electron";
import * as windowsUtil from '@vergo/api/windows-util';
import { extname } from "path";
import console = require("console");

const SimpleCache = require('simple-lru-cache');

export class IconCacher {
  constructor() {
    const cache = new SimpleCache({ maxSize: 100 });

    protocol.registerBufferProtocol(
      'icon',
      (req, callback) => {
        let filePath = null;
        try {
          const path_base64 = req.url.substr(7);
          filePath = new Buffer(path_base64, 'base64').toString();
        } catch (e) {
          // error
          return callback();
        }

        if (filePath === null || filePath.length === 0) {
          // error
          return callback();
        }

        let cacheKey = filePath;
        const extName = extname(filePath).toLowerCase();

        if (
          extName.length > 0 &&
          extName !== '.exe' &&
          extName !== '.lnk' &&
          extName !== '.appref-ms'
        ) {
          cacheKey = extName;
        } else {
          cacheKey = filePath;
        }

        const buffer = cache.get(cacheKey);
        if (buffer === undefined) {
          windowsUtil.fetchFileIconAsPng(filePath, (err, buf) => {
            if (err || buf === null) {
              console.log(`[iconprotocol] internal error ${err}`, cacheKey);
              return callback();
            }
            cache.set(cacheKey, buf);
            callback({ mimeType: 'image/png', data: buf });
          });
        } else {
          callback({ mimeType: 'image/png', data: buffer });
        }
      },
      (err) => {
        if (err) {
          console.log('[iconprotocol] failed to register protocol: icon');
        }
      }
    );
  }
}