const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'App/src'),
  build: path.join(__dirname, 'App/public'),
};

module.exports = {
  entry: `${PATHS.source}/index.js`,
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'App/src'),
      '@': path.join(__dirname, 'App/src/ducks'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'App'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
  ],
};
