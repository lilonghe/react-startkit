const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var DashboardPlugin = require('webpack-dashboard/plugin');
var Dashboard = require('webpack-dashboard');
var dashboard = new Dashboard();
const config = require('./webpack.config');

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: 'src',
    port: '3000',
    quiet: true,
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
    new webpack.optimize.CommonsChunkPlugin({ names: 'vendor', filename: 'vender-[chunkhash].min.js'}),
    new webpack.optimize.CommonsChunkPlugin({ names: 'manifest', filename: 'manifest-[hash].min.js' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: false
    }),
    new DashboardPlugin(dashboard.setData)
  ]
}
