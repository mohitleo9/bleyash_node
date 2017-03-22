const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
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
    new webpack.NamedModulesPlugin(),
  ],
};
