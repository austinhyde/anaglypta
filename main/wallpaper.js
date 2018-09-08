const path = require('path');
const {execFile} = require('child_process');
const {asyncify, when} = require('../shared/utils');

const windowsBin = path.resolve(__dirname, '../bin/wallpaper.exe');

module.exports.setWallpaper = when({
  windows: file => asyncify(execFile, windowsBin, [path.resolve(file)]),
});