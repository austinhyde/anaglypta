import {minBy} from 'lodash';

export function aspectRatio(width, height) {
  const r = width / height;
  const ratios = [[21, 9], [16, 9], [16, 10], [3, 2], [5, 4], [4, 3]];
  return minBy(ratios, ([w, h]) => Math.abs(r - w / h)).join(':');
}

export function lerp(x, [x0, x1], [y0, y1], clamp=false) {
  const y = (y0*(x1-x) + y1*(x-x0))/(x1 - x0);
  if (!clamp) return y;
  return Math.min(y1, Math.max(y0, y));
}

export function bucketLerp(x, [min, max], buckets) {
  return buckets[Math.floor(lerp(x, [min, max], [0, buckets.length-1], true))];
}

export function getAbsoluteOffset(el) {
  const out = [el.offsetLeft, el.offsetTop];
  while (el = el.offsetParent) {
    out[0] += el.offsetLeft;
    out[1] += el.offsetTop;
  }
  return out;
}