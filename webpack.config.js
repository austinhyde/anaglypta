const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = [
  {
    name: 'renderer',
    target: 'electron-renderer',
    mode: 'development',
    entry: path.resolve(__dirname, './src/renderer/index.js'),
    output: {
      publicPath: IS_DEV ? `http://localhost:8085/` : path.resolve(__dirname, './build'),
      path: path.resolve(__dirname, './build'),
      filename: 'index.js',
    },
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      overlay: true,
      port: 8085,
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
            presets: ['react', 'stage-0', ['env', { targets: { electron:'2.0.8'}}]]
          }}},
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.eot(\?v=.*)?$/, use: ['file-loader'] },
        { test: /\.(ico|png|gif|jpe?g)$/i, use: ['file-loader'] },
        { test: /\.woff2?(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { prefix: 'font/', limit: 5000 } }] },
        { test: /\.ttf(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'application/octet-stream', limit: 10000 } }] },
        { test: /\.svg(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/svg+xml', limit: 10000 } }] },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({alwaysWriteToDisk:true}),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackHarddiskPlugin(),
    ]
  },
  // {
  //   name: 'main',
  //   mode: 'development',
  //   target: 'electron-main',
  //   output: {
  //     path: path.resolve(__dirname, './dist'),
  //     filename: 'main.js',
  //   },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/, exclude: /node_modules/, use: {
  //           loader: 'babel-loader',
  //           options: {
  //             presets: ['stage-0', ['env', { targets: { node: '8.11.4' } }]]
  //           }
  //         }
  //       },
  //     ]
  //   },
  //   plugins: [
  //     new webpack.HotModuleReplacementPlugin(),
  //   ]
  // }
];