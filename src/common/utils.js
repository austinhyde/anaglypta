const { is } = require('electron-util');

module.exports.when = function when(map) {
  for (const k of Object.keys(map)) {
    if (is[k]) return map[k];
  }
  return null;
}
