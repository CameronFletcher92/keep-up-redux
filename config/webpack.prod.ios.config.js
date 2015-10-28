var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var mainPath = path.join(__dirname, '../client/src')
var buildPath = path.join(__dirname, '../www')
var htmlPath = path.join(__dirname, 'index.html')

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(mainPath, 'index.js')
  ],
  output: {
    publicPath: '/',
    path: buildPath,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: htmlPath, inject: false }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      __CORDOVA__: true
    }),

    // optimization
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: mainPath
    }]
  }
}
