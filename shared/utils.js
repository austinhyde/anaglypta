const { is } = require('electron-util');
const { minBy } = require('lodash');
const nearest = require('nearest-normal-aspect-ratio');

module.exports.when = function when(map) {
  for (const k of Object.keys(map)) {
    if (is[k]) return map[k];
  }
  return null;
}

module.exports.within = function within(x, y, t) {
  return Math.abs(x - y) < t;
}

module.exports.aspectRatio = function (width, height) {
  const r = width / height;
  const ratios = [[21, 9], [16, 9], [16, 10], [3, 2], [5, 4], [4, 3]];
  return minBy(ratios, ([w,h]) => Math.abs(r - w/h)).join(':');
}