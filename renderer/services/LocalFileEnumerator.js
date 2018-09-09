import {readdir, stat} from 'fs';
import * as path from 'path';
import {promisify} from 'util';

const asyncReaddir = promisify(readdir);
const asyncStat = promisify(stat);

export default class LocalFileEnumerator {
  constructor({path, recurse=true, extensions=['.jpg','.jpeg','.png','.gif']}) {
    this.path = path;
    this.recurse = recurse;
    this.extensions = extensions;

    this.filter = filterExtensions(extensions);
  }
  async listFiles() {
    let files;
    if (this.recurse) {
      // TODO
    } else {
      files = await asyncReaddir(this.path);
      files = files.map(f => path.join(this.path, f));
      files = await filterDirectories(files);
    }

    return this.filter(files);
  }
}

const getFiles = dir => promisify(readdir)

const filterDirectories = async files => {
  files = await Promise.all(files.map(path => asyncStat(path).then(info => ({path, info}))));
  return files.filter(fi => fi.info.isFile()).map(fi => fi.path);
};
const filterExtensions = exts => files => files.filter(f => exts.includes(path.extname(f)));
