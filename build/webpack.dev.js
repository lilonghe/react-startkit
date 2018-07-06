const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config');
const vendor = require('./manifest.json');
const packageConfig = require('../package.json');

module.exports = {
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: packageConfig.port ||  3000,
        quiet: true,
        stats: 'none'
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
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('./manifest.json')
        // }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development')
        // })
    ]
};
