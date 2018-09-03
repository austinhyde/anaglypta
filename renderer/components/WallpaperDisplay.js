import React from 'react';

export default function WallpaperDisplay({files}) {
  return (
    <div>
      {files.map(f => <img key={f} src={f} width="800"/>)}
    </div>
  )
}