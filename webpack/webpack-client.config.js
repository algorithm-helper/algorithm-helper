/* eslint-disable no-var */
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const outputDir = isProduction ? 'prod' : 'dev';

  return {
    context: path.resolve(__dirname, '..', 'src', 'client'),
    entry: './app.jsx',
    output: {
      filename: 'bundle-client.js',
      path: path.resolve(__dirname, '..', 'dist', outputDir),
    },
    target: 'node',
    externals: [nodeExternals()],
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
};
