/* eslint-disable no-var */
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        // {
        //   test: /\.(scss|sass|css)$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         modules: true,
        //         sourceMap: true,
        //         importLoader: 2,
        //         localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
        //       },
        //     },
        //     'sass-loader',
        //   ],
        // },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
      }),
    ],

    // plugins: [
    //   new MiniCssExtractPlugin({
    //     filename: 'styles.css',
    //     chunkFilename: '[path]__[name]__[local].css',
    //   }),
    // ],
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.css$/,
    //         chunks: 'all',
    //         enforce: true,
    //       },
    //     },
    //   },
    // },
  };
};
