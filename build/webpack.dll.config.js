const webpack = require('webpack');
const path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const packageConfig = require('../package.json');


const vendors = packageConfig.vendor || [];
module.exports = {
    output: {
        path: path.resolve("dist"),
        filename: '[name]_[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        vendor: vendors,
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.DllPlugin({
            path: path.resolve("build/manifest.json"),
            name: '[name]_[chunkhash]',
            context: __dirname,
        }),
        new CleanWebpackPlugin(
            ['dist/vendor*.js'],
            {
                root: path.resolve('./')
            }
        )
    ],
};