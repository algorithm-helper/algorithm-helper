/* eslint-disable no-var */
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const outputDir = isProduction ? 'prod' : 'dev';

  return {
    context: path.resolve(__dirname, '..', 'src', 'client'),
    entry: './app.jsx',
    output: {
      filename: 'bundle-client.min.js',
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
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoader: 2,
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: '[name].css',
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  };
};
