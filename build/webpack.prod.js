const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./webpack.config');
const vender = require('./manifest.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: config.entry,
  output: config.output,
  module: {
    rules: config.rules
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      vendorName: vender.name + '.js',
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
    }),
    new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./manifest.json')
    }),
    new CleanWebpackPlugin(
        ['dist'],
        {
            root: path.resolve('./'),
            exclude: [vender.name+'.js']
        }
    )
  ]
}