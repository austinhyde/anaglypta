import React from 'react';
import {remote} from 'electron';
const {setWallpaper} = remote.require('./wallpaper');

export default function WallpaperDisplay({files}) {
  return (
    <div>
      {files.map(f => <img key={f} src={f} width="100%" onClick={() => setWallpaper(f)}/>)}
    </div>
  )
}