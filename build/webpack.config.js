const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vendor = require('./manifest.json');
const WebpackMessages = require('webpack-messages');
const signale = require('signale');
const packageConfig = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        path: path.resolve("dist"),
        publicPath: packageConfig.publicPath || '/',
        chunkFilename: '[name].[chunkhash].js',
        filename: '[name].[hash].js',
    },
    rules: [
        {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        },
        {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            ]
        },
        {
            test: /\.(styl|css)$/,
            use:[
                MiniCssExtractPlugin.loader, 
                "css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]",
                "stylus-loader"]
        }
    ],
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new WebpackMessages({
            logger: str => signale.pending(`>> ${str}`),
            onComplete: (name,obj) => {
                var date = new Date();
                signale.success('>>', date.toLocaleDateString() + " " +date.toLocaleTimeString());
                signale.success('>>', (obj.endTime - obj.startTime) + 'ms');
            }
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
        }),
    ]
};