import { remote, app } from 'electron';
import * as fs from 'fs';
import * as fileUtil from './file-util';
import * as path from 'path';

export class Files {

  private _dataDir: string[] = [];
  private _systemDir: string[] = [];
  private _fileExtension: string[] = [];
  private _lazyIndexingKeys = {};
  private _context: any;

  constructor(context: any) {
    this._context = context;
    this.initPath();
  }
  initPath() {
    const _app = remote.app ? remote.app : app;
    const userPath = _app.getPath('appData');
    this._dataDir = [
      _app.getPath('desktop'),
      _app.getPath('documents'),
      _app.getPath('music'),
      _app.getPath('pictures'),
      'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs',
      userPath + '\\Microsoft\\Internet Explorer\\Quick Launch\\User Pinned\\TaskBar',
      userPath + '\\Microsoft\\Windows\\Start Menu'
    ];
    this._systemDir = ['C:\\Windows\\System32', 'C:\\Windows'];
    this._fileExtension = ['.exe', '.lnk', '.docx', '.xlsx', '.pdf'];
  }

  findfiles(dirs: string[], recursive: boolean = false) {
    for (const dir of dirs) {
      if (fs.existsSync(dir) === false) {
        continue;
      }
      const files = await fileUtil.readdir(dir, recursive, this.fileMatcher);
      this.updateIndexer(dir, files);

    }
  }
  fileMatcher(filePath, stats) {
    const ext = path.extname(filePath).toLowerCase();
    if (stats.isDirectory()) return true;
    if (this._fileExtension.includes(ext)) return true;
    return false;
  }
  updateIndexer(indexKey, files) {
    const indexerElements = filesToIndexerElements(files);
    this._context.indexer.set(indexKey, indexerElements);
  }

  lazyRefreshIndex = (dir, recursive) => {
    const _lazyKey = this._lazyIndexingKeys[dir];
    if (_lazyKey !== undefined) clearTimeout(_lazyKey);

    this._lazyIndexingKeys[dir] = setTimeout(() => {
      this.findfiles([dir], recursive);
    }, 10000);
  }

  setupWatchers = async (dirs, recursive) => {
    for (const dir of dirs) {
      const _dir = dir;

      try {
        fs.watch(
          _dir,
          {
            persistent: true,
            recursive: recursive,
          },
          (evt, filename) => {
            this.lazyRefreshIndex(_dir, recursive);
          }
        );
      } catch (err) {
      }
    }
  }
}

export const filesToIndexerElements = (files) => {
  return files.map((filePath) => {
    const basenameWithoutExt = path.basename(filePath, path.extname(filePath));
    const pathIcon = new Buffer(filePath).toString('base64');
    return {
      id: filePath,
      primaryText: basenameWithoutExt,
      secondaryText: filePath,
      icon: `icon://${pathIcon}`,
      group: 'Files & Folders',
    };
  });
}