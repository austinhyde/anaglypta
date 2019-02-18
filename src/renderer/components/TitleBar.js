import React from 'react';
import {when} from '../../common/utils';
import WindowsButtons from './WindowsButtons';
import folderSvg from '@icon/themify-icons/icons/folder.svg';
import filterSvg from '@icon/themify-icons/icons/filter.svg';

export default when({
  windows: WindowsTitleBar,
});

function WindowsTitleBar({title}) {
  return (
    <div className="titlebar stack">
      <div className="windowdrag" style={{width:'100%',height:'100%'}}/>
      <div className="horiz">
        <WindowsButtons
          hideMaximize
          hideMinimize
          hideClose
          customButtons={[
            { icon: folderSvg,
              onClick: () => console.log('click'),
              iconProps: {style:{WebkitMaskSize: '30%'}},
            },
            { icon: filterSvg,
              onClick: () => console.log('click'),
              iconProps: {style:{WebkitMaskSize: '30%'}},
            },
          ]}
        />
        <WindowsButtons className="justify-end" />
      </div>
    </div>
  );
}