const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    cache: {
        type: 'filesystem',
    },
    entry: path.resolve(__dirname, '../src', 'index.js'),
    output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[contenthash].js',
		publicPath: '/',
        clean: true,
        pathinfo: false,
	},
    optimization: {
        splitChunks: {
            chunks: 'all',
            hidePathInfo: true,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/', 'index.html'),
			filename: 'index.html',
			hash: true,
		}),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
				test: /\.m?js$/,
                include: /src/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env", 
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "react-hot-loader/babel",
                        ]
                    }
                }
			},
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]_[local]--[hash:base64:5]",
                            },
                            esModule: false,
                        },
                    },
                    "stylus-loader",
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]_[local]--[hash:base64:5]",
                            },
                            esModule: false,
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                exclude: /src/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
        ]
    }
}