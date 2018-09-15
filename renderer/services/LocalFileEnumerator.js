import {readdir, stat} from 'fs';
import * as path from 'path';
import {promisify} from 'util';
import sizeOf from 'image-size';
import {aspectRatio} from '../utils';

const asyncReaddir = promisify(readdir);
const asyncStat = promisify(stat);
const asyncSizeOf = promisify(sizeOf);

export default class LocalFileEnumerator {
  constructor({path, recurse=true, extensions=['.jpg','.jpeg','.png','.gif']}) {
    this.path = path;
    this.recurse = recurse;
    this.extensions = extensions;
  }
  async listFiles() {
    let files = await getFiles(this.path);

    if (this.recurse) {
      // todo
    } else {
      files = files.filter(f => !f.isDir);
    }

    files = files.filter(f => this.extensions.includes(f.ext));
    files = await Promise.all(files.map(addImageSize));
    return files;
  }
}

const addImageSize = f => asyncSizeOf(f.path).then(({width, height}) =>({
  ...f,
  width,
  height,
  aspectRatio: aspectRatio(width, height),
}))

const getFiles = dir => asyncReaddir(dir).then(fs =>
  Promise.all(fs.map(f =>
    asyncStat(path.resolve(dir, f)).then(s => ({
      name: f,
      path: path.resolve(dir, f),
      ext: path.extname(f),
      isDir: s.isDirectory(),
      created: s.birthtime,
      modified: s.mtime,
    }))
  ))
);

