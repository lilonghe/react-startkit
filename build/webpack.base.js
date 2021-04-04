const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = require('./config');

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
        new ESLintPlugin({
            fix: true,
            extensions: ['js','jsx'],
        }),
        new webpack.ProgressPlugin()          
    ],
    module: {
        rules: [
            {
				test: /\.m?js$/,
                exclude: /node_modules/,
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
            // assets loader
            {
                test: config.webpack.assetsPattern || /\.(png|jpg|gif|svg)$/,
                use:[
                    {
                        loader: config.webpack.assetsLoader || 'url-loader',
                        options: config.webpack.assetsLoaderOption || {
                            limit: 1024,
                            publicPath: 'assets',
                            outputPath: 'assets',
                        }
                    }
                ]
            },
        ]
    }
}