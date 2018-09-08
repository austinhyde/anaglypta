import {is} from 'electron-util';
import {execFile} from 'child_process';
import * as path from 'path';
import {asyncify} from '../../shared/utils';

import winExe from 'file-loader!../bin/wallpaper.exe';

export default class WallpaperSetter {
  setWallpaper(file) {
    if (is.windows) {
      this._setWallpaperWindows(file);
    }
  }

  _setWallpaperWindows(file) {
    return asyncify(execFile, winExe, [path.resolve(file)]);
  }
}