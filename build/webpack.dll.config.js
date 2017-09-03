const webpack = require('webpack');
const path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');


const vendors = ["react","react-dom"];

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
            ['dist/vender*.js'],
            {
                root: path.resolve('./')
            }
        )
    ],
};