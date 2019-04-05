import * as fs from "fs";
import * as path from "path";

function _readdir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
}

function _stat(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return reject(err);
      }
      return resolve(stats);
    });
  });
}

function _realpath(filePath) {
  return new Promise((resolve, reject) => {
    fs.realpath(filePath, (err, _path) => {
      if (err) {
        return reject(err);
      }
      return resolve(_path);
    });
  });
}

export const readdir = async (dirPath, recursive, matcher) => {
  const matchedPaths = [];
  const pendingDirs = [dirPath];
  const scannedDirs = {};
  while (pendingDirs.length > 0) {
    const dir = pendingDirs.shift();
    const realdir = await _realpath(dir);

    if (scannedDirs[realdir]) continue;
    scannedDirs[realdir] = true;

    try {
      const files = await _readdir(realdir);
      for (const file of files) {
        const filePath = path.join(realdir, file);
        try {
          const stat = await _stat(filePath);
          if (stat.isDirectory() && recursive) pendingDirs.push(filePath);
          if (matcher(filePath, stat)) matchedPaths.push(filePath);
        } catch (e) {}
      }
    } catch (e) {}
  }
  return matchedPaths;
}