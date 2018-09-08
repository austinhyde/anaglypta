const path = require('path');
const {execFile} = require('child_process');
const {is} = require('electron-util');
const {asyncify} = require('../shared/utils');

const windowsBin = path.resolve(__dirname, '../bin/wallpaper.exe');

module.exports.setWallpaper = file => {
  if (is.windows) {
    return asyncify(execFile, windowsBin, [path.resolve(file)]);
  }
}