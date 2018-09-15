import React from 'react';
import {remote} from 'electron';
import Bricks from './Bricks';
import Image from './Image';
const {setWallpaper} = remote.require('./wallpaper');

export default function WallpaperDisplay({files}) {
  return (
    <Bricks className="wallpaper-display">
      {files.map((f, i) => <Image key={f.path} i={i} file={f} onSetWallpaper={setWallpaper} />)}
    </Bricks>
  )
}