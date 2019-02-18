import React from 'react';

const defaultOpts = {
  ErrorComponent: ({error}) => <strong className="error">{error+''}</strong>,
  LoadingComponent: () => <em>Loading...</em>,
}

export default (propMapper, opts=defaultOpts) => BaseComponent =>
  class extends React.Component {
    state = {
      loading: true,
      error: null,
      data: null,
    }
    componentWillMount() {
      this.runPromises(this.props);
    }
    runPromises(props) {
      this.setState({loading: true, error: null, data: null}, () => {
        this.promise = allValuePromises(propMapper(props));
        this.promise.then(
          data => this.setState({loading: false, error: null, props: data}),
          err => {
            console.error(err);
            this.setState({loading: false, error: err, props: null});
          },
        );
      });
    }
    
    render() {
      if (this.state.loading) return <opts.LoadingComponent {...this.props}/>;
      if (this.state.error) return <opts.ErrorComponent error={this.state.error} {...this.props}/>;
      return <BaseComponent {...this.props} {...this.state.props}/>;
    }
  }

// like Promise.all except accepts an object
function allValuePromises(obj) {
  const promisePairs = Object.keys(obj).map(k =>
    Promise.resolve(obj[k]).then(v => [k, v])
  );
  return Promise.all(promisePairs).then(pairs => {
    const obj = {}
    pairs.forEach(p => obj[p[0]] = p[1]);
    return obj;
  });
}