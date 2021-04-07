const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = require('./config');

const devMode = process.env.NODE_ENV !== 'production';
const plugins = [
    config.webpack.enableESLint && new ESLintPlugin({
        fix: true,
        extensions: ['js','jsx'],
    }),
].filter(p=>p);

const cssSRC = {
    loader: "css-loader",
    options: {
        modules: {
            localIdentName: "[name]_[local]--[hash:base64:5]",
        },
        esModule: false,
    },
}

const lessSRC = {
    loader: 'less-loader',
    options: {
        lessOptions: {
            javascriptEnabled: true
        }
    }
};

const babelOptions = {
    presets: [
        "@babel/preset-env", 
        "@babel/preset-react"
    ],
    plugins: [
        "react-hot-loader/babel",
    ]
};

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
    resolve:{
        alias: config.webpack.alias || {},
        fallback: config.webpack.fallback || {},
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
        new webpack.ProgressPlugin(),    
        ...plugins,  
    ],
    module: {
        rules: [
            {
				test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions,
                }
			},
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    cssSRC,
                    "stylus-loader",
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    cssSRC,
                ]
            },
            {
                test: /\.less$/,
                include: /src/,
                use: [
                    MiniCssExtractPlugin.loader,
                    cssSRC,
                    lessSRC,
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