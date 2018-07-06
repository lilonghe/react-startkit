const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./webpack.config');
const vendor = require('./manifest.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    entry: config.entry,
    output: config.output,
    module: {
        rules: config.rules
    },
    stats: 'none',
    plugins: [
        ...config.plugins,
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new CleanWebpackPlugin(
            ['dist'],
            {
                root: path.resolve('./'),
                exclude: [vendor.name+'.js']
            }
        ),
        new AddAssetHtmlPlugin({ 
            filepath: require.resolve('../dist/'+vendor.name+'.js'), 
            includeSourcemap: false 
        }),
    ]
};