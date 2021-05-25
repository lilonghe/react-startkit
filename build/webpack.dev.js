const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');
const config = require('./config');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      contentBase: 'public',
      hot: true,
      historyApiFallback: true,
      port: config.webpack.port || '8080',
      stats: 'minimal',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
});
