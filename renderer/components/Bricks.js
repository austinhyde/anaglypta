import React from 'react';

export default function({ cols=3, style, children, ...props }) {
  style = {
    ...style,
    columnCount: cols
  };
  return (
    <div style={style} {...props}>
      {reorder(children, cols)}
    </div>
  );
}

const reorder = (arr, cols) => {
  const out = [];
  for (let col = 0; col < cols; col++) {
    for (let i = 0; i < arr.length; i += cols) {
      let _val = arr[i + col];
      if (_val !== undefined)
        out.push(_val);
    }
  }
  return out;
}