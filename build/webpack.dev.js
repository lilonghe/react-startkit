const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');
const vender = require('./manifest.json');

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: 'dist',
    port: '3000',
    quiet: false,
  },
  entry: config.entry,
  output: config.output,
  performance: {
    hints: false
  },
  module: {
    rules: config.rules
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      vendorName: vender.name + '.js',
      hash: false
    }),
    new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require('./manifest.json')
    }),
  ]
}
