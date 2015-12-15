var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./base');

// merge baseConfig, replace properties with the same name, not recursively
var config = _.assign(_.cloneDeep(baseConfig), {
  entry: {
    app: [
      'webpack-dev-server/client?http://127.0.0.1:8000',
      'webpack/hot/only-dev-server',
      './src/v2/app'
    ],
    vendor: [
      'classnames',
      'console-polyfill',
      'es5-shim',
      'es5-shim/es5-sham',
      'history',
      'jquery',
      'lodash',
      'normalize.css',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-router',
      'redux-thunk'
    ]
  },
  cache: true,
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
});

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: path.join(__dirname, '/../src/v2')
});

module.exports = config;
