import React from 'react';
import {css} from 'glamor';
import {remote} from 'electron';

const styles = {
  buttons: css({
    width: 138,
    height: 30,
    WebkitAppRegion: 'no-drag',
    display: 'flex',
    flexDirection: 'row',
    userSelect: 'none',
    cursor: 'default',
  }),
  button: css({
    flex: '1 0 auto',
    ':hover': { backgroundColor: 'hsla(0, 0%, 100%, .1)' },
    ':active': { backgroundColor: 'hsla(0, 0%, 100%, .1)' },
    '& div': {
      width: '100%',
      height: '100%',
      backgroundColor: '#CCC9C2',
      maskSize: '23.1%',
      ':hover, :active': { backgroundColor: '#FFFFFF' },
    },
  }),
  close: css({
    ':hover': { backgroundColor: 'rgba(232, 17, 35, .9)' },
    ':active': { backgroundColor: 'rgba(232, 17, 35, .7)' },
    '& div': { mask: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z' fill='%23000'/%3E%3C/svg%3E") no-repeat 50% 50%`, }
  }),
  minimize: css({
    '& div': { mask: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 4.399V5.5H0V4.399h11z' fill='%23000'/%3E%3C/svg%3E") no-repeat 50% 50%` },
  }),
  maximize: css({
    '& div': { mask: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 0v11H0V0h11zM9.899 1.101H1.1V9.9h8.8V1.1z' fill='%23000'/%3E%3C/svg%3E") no-repeat 50% 50%` },
  }),
};

const defaultOpts = {
  onMinimizeClick: minimize,
  onMaximizeClick: maximize,
  onCloseClick: close,
};

export default function WindowsButtons({opts,...props}) {
  opts = Object.assign({}, defaultOpts, opts);
  return (
    <div {...styles.buttons} {...props}>
      <div {...styles.button} {...styles.minimize} onClick={opts.onMinimizeClick}><div/></div>
      <div {...styles.button} {...styles.maximize} onClick={opts.onMaximizeClick}><div/></div>
      <div {...styles.button} {...styles.close} onClick={opts.onCloseClick}><div/></div>
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