const path = require('path')

module.exports = {
	entry: {
	    index: './src/index.js',
  	},
  	output: {
	    path: path.resolve("dist"),
	    publicPath: '/',
	    chunkFilename: '[name].[chunkhash].js',
	    filename: '[name].[hash].js',
  	},
  	rules: [
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
        test: /\.css$/,
        loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]!stylus-loader"
      },
      {
        test: /\.styl$/,
        loader: "style-loader!css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]!stylus-loader"
      }
    ]
}