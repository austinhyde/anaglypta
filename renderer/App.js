import React from 'react';
import TitleBar from './components/TitleBar';
import WallpaperDisplay from './components/WallpaperDisplay';
import LocalFileEnumerator from './services/LocalFileEnumerator';
import asyncProps from './hoc/asyncProps';

import './styles.scss';

const lfe = new LocalFileEnumerator({
  path: 'D:\\SynologyDrive\\dropbox\\wallpaper',
  recurse: false,
});

export default asyncProps(() => ({
  files: lfe.listFiles(),
}))(function App({files}) {
  return (
    <div className="app vert">
      <TitleBar title=""/>
      <WallpaperDisplay files={files}/>
    </div>
  );
});