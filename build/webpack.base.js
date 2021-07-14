const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = require('./config');

const devMode = process.env.NODE_ENV !== 'production';
const plugins = [
    config.webpack.enableESLint && new ESLintPlugin({
        fix: true,
        extensions: ['js','jsx'],
    }),
    // new BundleAnalyzerPlugin(),
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

const libCSSSRC = {
    loader: "css-loader",
    options: {
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
		filename: '[contenthash].js',
        chunkFilename: '[contenthash].js',
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
            filename: '[contenthash].css',
            chunkFilename: '[contenthash].css',
        }),
        new webpack.ProgressPlugin(),    
        ...plugins,  
    ],
    module: {
        rules: [
            {
				test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions,
                }
			},
            {
                test: /\.css$/,
                include: /src/,
                use: [
                    MiniCssExtractPlugin.loader,
                    cssSRC,
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    libCSSSRC,
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