import React from 'react';
import {remote} from 'electron';
import Bricks from './Bricks';
import Image from './Image';
import withWindowSize from '../hoc/withWindowSize';
const {setWallpaper} = remote.require('./wallpaper');

export default withWindowSize(function WallpaperDisplay({files, windowSize}) {
  const maxWidth = 500;
  console.log(windowSize);
  const cols = Math.floor(windowSize[0] / maxWidth);
  // const cols = 3;
  return (
    <Bricks className="wallpaper-display" cols={cols}>
      {files.map((f, i) => <Image key={f.path} i={i} file={f} onSetWallpaper={setWallpaper} />)}
    </Bricks>
  )
})