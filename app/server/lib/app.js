import { createServer } from "node:http";
import { host, port } from "#server/constants.js";
import { renderPage } from "#server/lib/page.js";
import { routes } from "#server/routes/index.js";

/** @type {ServerMiddleware} */
async function next(req, res) {
	const url = new URL(`${host}${req.url}`);
	const { pathname } = url;
	const route = routes[pathname] || routes["/"];

	let contentType = "text/html; charset=utf-8";
	let template = "";

	try {
		const { method = "GET" } = req;
		const routeData = await route[method]({ req, res });
		({ contentType = "text/html; charset=utf-8", template = "" } = routeData);

		if (routeData.page) {
			template = await renderPage({ ...routeData.page, pathname });
		}
	} catch (error) {
		console.error(error);
	}

	res.setHeader("Content-Type", contentType);
	res.end(template.trim());
}

/** @type {(middleware?: ServerMiddleware) => import("node:http").Server} */
export function createApp(middleware) {
	const server = createServer((req, res) => {
		if (middleware) {
			middleware(req, res, next);
		} else {
			next(req, res);
		}
	});

	server.listen(port, "localhost", () => {
		console.info(`Сервер запущен по адресу: ${host}`);
	});

	return server;
}
