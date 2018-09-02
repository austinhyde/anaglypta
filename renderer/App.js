import React from 'react';
import TitleBar from './components/TitleBar';

import './styles.scss';

export default function App() {
  return (
    <div className="app vert">
      <TitleBar title=""/>
      <div>Hello world</div>
    </div>
  );
}