import { access, mkdir, writeFile } from "node:fs/promises";
import { host } from "#server/constants.js";
import { createApp } from "#server/lib/app.js";

const server = createApp();
const pages = ["/", "/404.html", "/sitemap.xml"];

await Promise.all(
	pages.map(async (url) => {
		const markup = await fetch(`${host}${url}`).then((res) => res.text());

		if (url.includes(".")) {
			await writeFile(`./public${url}`, markup);
		} else if (url === "/") {
			await writeFile("./public/index.html", markup);
		} else {
			const dir = `./public${url}`;
			try {
				await access(dir);
			} catch {
				await mkdir(dir, { recursive: true });
			}
			await writeFile(`${dir}/index.html`, markup);
		}
		console.info(`Страница ${url} сгенерирована.`);
	}),
);

server.close();
