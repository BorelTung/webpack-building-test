var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var fs = require('fs-extra');

var baseConfig = require('./base');
var publicPath = '/v2/assets/';

// remove script tags from index.html, write to .tmp folder
console.log('> remove useless script tags from src/v2/index.html');
var htmlStr = fs.readFileSync(path.join(__dirname, '../src/v2/index.html'), 'utf8');
htmlStr = htmlStr.replace(/<script[^<]*((?!<\/script>)<[^<]*)*<\/script>/gi, '');
fs.ensureDir(path.join(__dirname, '../.tmp'));
fs.removeSync(path.join(__dirname, '../.tmp/*'));
fs.writeFileSync(path.join(__dirname, '../.tmp/index.html'), htmlStr, 'utf8');

// Add needed plugins here
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = _.assign(_.cloneDeep(baseConfig), {
  output: {
    publicPath: publicPath,
    path: path.join(__dirname, '../dist/v2/assets/'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  entry: {
    app: path.join(__dirname, '../src/v2/app'),
    vendor: [
      'classnames',
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
  cache: false,
  devtool: false,
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 2
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../.tmp/index.html'),
      filename: '../index.html',
      inject: 'body',
      minify: {
        collapseBooleanAttributes:      true,
        collapseWhitespace:             true,
        removeAttributeQuotes:          true,
        removeComments:                 true,
        removeEmptyAttributes:          true,
        removeRedundantAttributes:      true,
        removeScriptTypeAttributes:     true,
        removeStyleLinkTypeAttributes:  true
      }
    })
  ]
});

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: path.join(__dirname, '/../src/v2')
});

module.exports = config;
