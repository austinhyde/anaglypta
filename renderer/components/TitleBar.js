import React from 'react';
import {when} from '../../shared/utils';
import WindowsButtons from './WindowsButtons';


export default when({
  windows: WindowsTitleBar,
});

function WindowsTitleBar({title}) {
  return (
    <div className="titlebar">
      <div className="windowdrag" style={{width:'100%',height:'100%'}}/>
      <WindowsButtons style={{position:'absolute',right:0,top:0}} />
    </div>
  );
}