const windowsUtil = require('bindings')(`win32-${process.arch}`);

export const fetchFileIconAsPng = (filePath, callback) => {
  try {
    windowsUtil.fetchFileIconAsPng(filePath, callback);
  } catch (e) {
    console.log(e);
  }
}

export const saveFocus = () => {
  windowsUtil.saveFocus();
}

export const restoreFocus = () => {
  windowsUtil.restoreFocus();
}