import * as path from 'path';


function fileToIndexerElement(filePath) {
  const basenameWithoutExt = path.basename(filePath, path.extname(filePath));
  const path_b64 = new Buffer(filePath).toString('base64');
  return {
    id: filePath,
    primaryText: basenameWithoutExt,
    secondaryText: filePath,
    icon: `icon://${path_b64}`,
    group: 'Files & Folders'
  };
}

export const filesToIndexerElements = (files) => {
  return files.map(fileToIndexerElement);
}
