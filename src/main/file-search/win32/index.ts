import * as fs from "fs";
import * as path from "path";
import * as searchUtil from './search-util';
import * as fileUtil from './file-util';
import * as sharedUtil from '../shared-util';
import console = require("console");

let shell;
let app;
let initialPref;
let indexer;
let toast;

let recursiveSearchDirs = [
  "${USERPROFILE}\\Desktop",
  "${USERPROFILE}\\Links",
  "${ProgramData}\\Microsoft\\Windows\\Start Menu\\Programs",
  "${APPDATA}\\Microsoft\\Internet Explorer\\Quick Launch\\User Pinned\\TaskBar",
  "${APPDATA}\\Microsoft\\Windows\\Start Menu"
]

let flatSearchDirs = ["${SystemRoot}\\System32", "${SystemRoot}"];

let searchExtensions = [".appref-ms", ".exe", ".lnk", ".bat", ".url"];
let lazyIndexingKeys = {};


const fileMatcher = (filePath, stats) => {
  const ext = path.extname(filePath).toLowerCase();
  if (stats.isDirectory()) return true;
  if (searchExtensions.includes(ext)) return true;
  return false;
}

const findFilesAndUpdateIndexer = async (dirs, recursive) => {
  for (const dir of dirs) {
    if (fs.existsSync(dir) === false) {
      console.log(fs.existsSync(dir));
      continue;
    }
    const files = await fileUtil.readdir(dir, recursive, fileMatcher);
    updateIndexer(dir, files);
  }
}

function updateIndexer(indexKey, files) {
  const indexerElements = searchUtil.filesToIndexerElements(files);
  console.log(`Indexer has updated ${indexKey}, ${files.length} files`);
}

const lazyRefreshIndex = (dir, recursive) => {
  const _lazyKey = lazyIndexingKeys[dir];
  if (_lazyKey !== undefined) clearTimeout(_lazyKey);

  lazyIndexingKeys[dir] = setTimeout(() => {
    findFilesAndUpdateIndexer([dir], recursive);
  }, 10000);
}

const setupWatchers = async (dirs, recursive) => {
  for (const dir of dirs) {
    const _dir = dir;

    try {
      fs.watch(
        _dir,
        {
          persistent: true,
          recursive: recursive
        },
        (evt, filename) => {
          lazyRefreshIndex(_dir, recursive);
        }
      );
    } catch (err) {
    }
  }
}

export const startup = () => {
  findFilesAndUpdateIndexer(recursiveSearchDirs, true)
  findFilesAndUpdateIndexer(flatSearchDirs, false);
  setupWatchers(recursiveSearchDirs, true);
  setupWatchers(flatSearchDirs, false);
}

export const execute = async (id, payload, extra) => {
  if (fs.existsSync(id) === false) {
    return;
  }
}
