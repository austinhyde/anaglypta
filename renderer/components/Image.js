import React from 'react';

export default function Image({file, onSetWallpaper, ...props}) {
  return (
    <div className="image">
      <img {...props}
        src={file.path}
        onClick={() => onSetWallpaper(file.path)}
      />
      {/* <div className="img" style={{width:file.width,height:file.height,backgroundColor:'#999',border:'1px solid #333'}}/> */}
      <div className="info">
        <span>{file.width}×{file.height}</span>
        <span>{' - '}{file.aspectRatio}</span>
        <span>{' - '}{file.name}</span>
      </div>
    </div>
  );
}