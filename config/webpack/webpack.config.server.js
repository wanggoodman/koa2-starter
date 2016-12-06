const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const src = path.resolve('./app');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  devtool: 'eval',
  entry: [path.join(src, 'server.js')],
  output: {
      filename: 'server.js',
      path: path.resolve('build')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      //query: require('../babel/babel.server'),
    }]
  },
  externals: nodeModules,
  node: {
    fs: "empty"
  }
};
