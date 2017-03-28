const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

let common = {
  // the first one is dev onli entry
  entry: [
    'babel-polyfill',
    './app/client/app.jsx',
  ],
  output: {
    path: path.resolve(__dirname, './app/build/static'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      // this is so that the html file can be reloaded on change
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    // dev only
    new webpack.NamedModulesPlugin(),
  ],
};

let config;

switch(process.env.NODE_ENV) {
  case 'production':
    config = common;
    break;

  case 'development':
    config = merge(
      common,
      {
        entry: ['webpack-hot-middleware/client?reload=true'],
        devtool: 'eval-source-map',
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
        ],
      }
    );
    break;
}

module.exports = config;
