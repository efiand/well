const autoprefixer = require('autoprefixer');
const mqpacker = require('postcss-sort-media-queries');

const config = {
	syntax: 'postcss-scss',
	plugins: [
		autoprefixer,
		mqpacker,
	],
};

module.exports = config;
