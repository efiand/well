import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteSingleFile } from 'vite-plugin-singlefile';
import sprite from './src/assets/sprite';

// https://vitejs.dev/config/
export default defineConfig({
	base: '',
	plugins: [
		viteSingleFile(),
		createHtmlPlugin({
			minify: true,
			entry: 'src/main.js',
			inject: { data: { sprite } },
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
