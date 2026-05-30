import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import sortMediaQueries from 'postcss-sort-media-queries';
import postcssUrl from 'postcss-url';

export default {
	plugins: [
		postcssImport(),
		sortMediaQueries(),
		postcssUrl({
			filter: '**/icons/*',
			url: 'inline',
		}),
		cssnano(),
	],
};
