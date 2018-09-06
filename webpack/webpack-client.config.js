/* eslint-disable no-var */
var path = require('path');
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '..', 'src', 'client'),
  entry: './app.jsx',
  output: {
    filename: 'bundle-client.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, '..', 'src', 'client'),
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
