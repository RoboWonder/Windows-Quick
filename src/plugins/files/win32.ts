import { remote, app } from 'electron';
import * as fs from 'fs';
import * as fileUtil from './file-util';
import * as path from 'path';

export class Files {

  private _dataDir: string[] = [];
  private _systemDir: string[] = [];
  private _fileExtension: string[] = [];
  private context: any;

  constructor(context: any) {
    this.context = context;
    this.initPath();
    this.findfiles(this._dataDir, true);
    this.findfiles(this._systemDir, false);
  }
  initPath() {
    const _app = remote ? remote.app : app;
    const userPath = _app.getPath('appData');
    this._dataDir = [
      _app.getPath('desktop'),
      'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs',
      userPath + '\\Microsoft\\Internet Explorer\\Quick Launch\\User Pinned\\TaskBar',
      userPath + '\\Microsoft\\Windows\\Start Menu'
    ];
    this._systemDir = ['C:\\Windows\\System32', 'C:\\Windows'];
    this._fileExtension = ['.exe', '.lnk'];
  }

  async findfiles(dirs: string[], recursive: boolean = false) {
    for (const dir of dirs) {
      if (fs.existsSync(dir) === false) {
        continue;
      }
      const files = await fileUtil.readdir(dir, recursive, this._fileExtension);
      this.updateIndexer(dir, files);

    }
  }

  updateIndexer(indexKey, files) {
    const indexerElements = filesToIndexerElements(files);
    this.context.indexer.set(indexKey, indexerElements);
  }

  public execute(id, payload, extra) {
    if (fs.existsSync(id) === false) {
      return;
    }
    this.context.shell.openItem(id);
  }
}

export const filesToIndexerElements = (files) => {
  return files.map((filePath) => {
    const basenameWithoutExt = path.basename(filePath, path.extname(filePath));
    const pathIcon = Buffer.from(filePath).toString('base64');
    return {
      id: filePath,
      primaryText: basenameWithoutExt,
      secondaryText: 'Desktop app',
      url: filePath,
      icon: `icon://${pathIcon}`,
      plugin: 'files'
    };
  });
}