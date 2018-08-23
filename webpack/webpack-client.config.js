var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const outputDir = isProduction ? 'prod' : 'dev';

  return {
    context: path.resolve(__dirname, '..', 'src', 'client'),
    entry: './app.js',
    output: {
      filename: 'bundle-client.js',
      path: path.resolve(__dirname, '..', 'dist', outputDir),
    },
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        modules: [
          path.resolve(__dirname, '..', 'src', 'client'),
          path.resolve(__dirname, '..', 'node_modules'),
        ],
    },
    stats: {
      warnings: false
    },
  };
};
