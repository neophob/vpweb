const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
	return {
		entry: {
			'app': './src/index.js',
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html',
				minify: true,
			}),
			// new webpack.ProvidePlugin({
			// 	__alloc__: resolve('./webpack/alloc-log-collector'),
			// }),
		],
		module: {
			rules: [
				{
					test: /\.vbs$/i,
					use: 'raw-loader',
				},
				{
					test: /\.(scss|sass)$/,
					use: [{
						loader: 'style-loader', // inject CSS to page
					}, {
						loader: 'css-loader', // translates CSS into CommonJS modules
					}, {
						loader: 'postcss-loader', // Run postcss actions
						options: {
							plugins: function () { // postcss plugins, can be exported to postcss.config.js
								return [
									require('autoprefixer')
								];
							}
						}
					}, {
						loader: 'sass-loader' // compiles Sass to CSS
					}]
				},
				{
					test: /\.(eot|woff|woff2|ttf|otf|png|svg|jpg|swf|hdr|exr)$/,
					loader: { loader: 'file-loader', options: {name: '[path][name]-[sha256:hash:base58:8].[ext]'} },
				},
			],
			noParse: /moo\.js/
		},
		output: {
			path: resolve(__dirname, '..', 'dist'),
			filename: '[name].bundle-[chunkhash].js',
			hashFunction: 'sha256',
			hashDigest: 'hex',
			hashDigestLength: 12
		},
		devtool: 'source-map'
	};
};
