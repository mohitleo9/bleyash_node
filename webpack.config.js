const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let common = {
  // the first one is dev onli entry
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './app/client/app.jsx',
  ],
  output: {
    path: path.resolve(__dirname, './app/build/static'),
    publicPath: 'static/',
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(jpg|gif|png|svg|eot|woff2|woff|ttf)$/,
        loader: 'url-loader',
        options: {
          name: '[path][name].[hash].[ext]',
          limit: 10000,
        },
        include: [
          path.resolve(__dirname, 'app/client/assets/'),
          /slick/,
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
        include: [
          path.resolve(__dirname, 'app/client/assets'),
          /flexbox/,
          /slick/,
        ]
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'app/client')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
      },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};

let config;

switch(process.env.NODE_ENV) {
  case 'production':
    // production is taken from https://webpack.js.org/guides/production-build/
    config = merge(
      common,
      {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          new webpack.optimize.UglifyJsPlugin({
            sourceMap: common.devtool && (common.devtool.indexOf("sourcemap") >= 0 || common.devtool.indexOf("source-map") >= 0)
          }),
        ]
      }
    );
    break;

  case 'development':
    config = merge(
      common,
      {
        entry: ['webpack-hot-middleware/client?reload=true'],
        devtool: 'source-map',
        plugins: [
          new webpack.HotModuleReplacementPlugin(),
        ],
      }
    );
    break;
}

module.exports = config;
