const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const webpack = require('webpack');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: 'public',
      hot: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
});
