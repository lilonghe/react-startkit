const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: config.entry,
  output: config.output,
  module: {
    rules: config.rules
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ names: 'vendor', filename: 'vender-[chunkhash].min.js'}),
    new webpack.optimize.CommonsChunkPlugin({ names: 'manifest', filename: 'manifest-[hash].min.js' }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {  
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      }
    })
  ]
}