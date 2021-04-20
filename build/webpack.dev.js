const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');
const config = require('./config');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: 'public',
      hot: true,
      historyApiFallback: true,
      port: config.port || '8080',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
});
