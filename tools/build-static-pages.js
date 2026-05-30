import { writeFile } from 'node:fs/promises';
import { minifySitemap } from '#common/lib/minify-sitemap.js';
import { host } from '#server/constants.js';
import { closeApp, createApp } from '#server/lib/app.js';
import { minifyHtml } from '#server/lib/minify-html.js';

const PAGES = ['/', '/404.html', '/sitemap.xml'];
const server = createApp();
let completedPages = 0;

try {
	await Promise.all(
		PAGES.map(async (url) => {
			const markup = await fetch(`${host}${url}`).then((res) => res.text());

			if (url === '/sitemap.xml') {
				await writeFile('./public/sitemap.xml', minifySitemap(markup));
			} else if (url === '/') {
				await writeFile('./public/index.html', await minifyHtml(markup));
			} else {
				await writeFile('./public/404.html', await minifyHtml(markup));
			}

			console.info(`Страница ${url} сгенерирована.`);
			completedPages++;
		}),
	);
	console.info(`✅ Всего сгенерировано страниц: ${completedPages}`);
} finally {
	await closeApp(server);
}
