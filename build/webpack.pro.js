const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: 'public',
                    to: './',  
                    globOptions: {
                        ignore: [
                            path.resolve(__dirname, '../public/', 'index.html'),
                        ]
                    }
                }
            ],
            
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false
          }),
          '...',
        ],
    },
});
