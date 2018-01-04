const path = require('path');

const PATHS = {
  source: path.join(__dirname, 'App/src'),
  build: path.join(__dirname, 'App/public'),
};

module.exports = {
  entry: `${PATHS.source}/index.js`,
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'main.js',
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
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'App'),
    compress: true,
    port: 9000,
  },
};
