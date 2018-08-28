/* eslint-disable no-var */
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname, '..', 'src', 'server'),
  entry: './server.js',
  output: {
    filename: 'bundle-server.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    modules: [
      path.resolve(__dirname, '..', 'src', 'server'),
      path.resolve(__dirname, '..', 'node_modules'),
    ],
  },
  stats: {
    warnings: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
