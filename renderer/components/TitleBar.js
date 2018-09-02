import React from 'react';
import {is} from 'electron-util';
import {remote} from 'electron';

export default function TitleBar(props) {
  if (is.windows) {
    return <WindowsTitleBar {...props}/>;
  }
  return null;
}

function WindowsTitleBar({title}) {
  return (
    <div className="titlebar windows horiz">
      <div className="title grow">{title}</div>
      <WindowsTitleBarButtons />
    </div>
  );
}

function WindowsTitleBarButtons() {
  return (
    <div className="buttons horiz">
      <div className="button minimize grow" onClick={minimize}><div/></div>
      <div className="button maximize grow" onClick={maximize}><div/></div>
      <div className="button close grow" onClick={close}><div/></div>
    </div>
  );
}

function minimize() {
  remote.getCurrentWindow().minimize();
}
function maximize() {
  const win = remote.getCurrentWindow();
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
}
function close() {
  remote.getCurrentWindow().close();
}