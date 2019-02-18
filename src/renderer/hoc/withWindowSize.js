import React from 'react';

export default BaseComponent =>
  class WindowSizeObserver extends React.Component {
    listener = () => this.setState({ windowSize:[window.innerWidth, window.innerHeight] });
    componentWillMount() {
      this.listener();
      window.addEventListener('resize', this.listener);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.listener);
    }
    render() {
      return <BaseComponent {...this.state} {...this.props}/>
    }
  };