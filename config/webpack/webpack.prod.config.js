'use strict';

const webpack = require('webpack');
const fs = require('fs');

let mods = {};
fs.readdirSync('node_modules')
	.filter(x => ['.bin'].indexOf(x) === -1)
	.forEach(mod => {
		mods[mod] = 'commonjs ' + mod;
	});

module.exports = {
	entry: [
		//'babel-polyfill',
		'./main.js'
	],
	output: {
		filename: 'bin/prod.js'
	},
	externals: mods,
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0']
				}
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};
