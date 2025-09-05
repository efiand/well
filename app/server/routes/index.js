import { mainRoute } from "#server/routes/main.js";
import { sitemapXmlRoute } from "#server/routes/sitemap-xml.js";

/** @type {{ [name: string]: Route }} */
export const routes = {
	"/": mainRoute,
	"/sitemap.xml": sitemapXmlRoute,
};
