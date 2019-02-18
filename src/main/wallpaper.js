const path = require('path');
const {execFile} = require('child_process');
const {when} = require('../common/utils');
const {promisify} = require('util');

const windowsBin = path.resolve(__dirname, '../../static/wallpaper.exe');

module.exports.setWallpaper = when({
  windows: file => promisify(execFile)(windowsBin, [path.resolve(file)]),
});