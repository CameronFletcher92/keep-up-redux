var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var mainPath = path.join(__dirname, '../client/src')
var buildPath = path.join(__dirname, '../client/build')
var htmlPath = path.join(__dirname, '../client/src/index.html')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(mainPath, 'index.js')
  ],
  output: {
    publicPath: '/',
    path: buildPath,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: htmlPath, inject: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel'],
      include: mainPath
    }]
  }
}
