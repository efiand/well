import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { SyntaxValidator } from 'fast-xml-validator';
import { HtmlValidate } from 'html-validate';
import * as bemLinter from 'posthtml-bem-linter';
import { log } from '#common/lib/log.js';
import { host } from '#server/constants.js';
import { closeApp, createApp } from '#server/lib/app.js';
import validatorConfig from '../.htmlvalidate.js';

const htmlvalidate = new HtmlValidate(validatorConfig);

/** @type {string[]} */
const PAGES = ['/'];

/** @type {string[]} */
let markups = [];

/** @type {import("node:http").Server | undefined} */
let server;

async function getMarkup(page = '') {
	return await fetch(`${host}${page}`).then((res) => res.text());
}

before(async () => {
	if (!server) {
		server = createApp();
	}

	if (!markups.length) {
		markups = await Promise.all(PAGES.map(getMarkup));
	}
});

test('All pages have valid HTML markup', async () => {
	let errorsCount = 0;

	await Promise.all(
		PAGES.map(async (page, i) => {
			const report = await htmlvalidate.validateString(markups[i]);
			if (!report.valid) {
				errorsCount++;
				report.results.forEach(({ messages }) => {
					messages.forEach(({ column, line, message, ruleUrl }) => {
						log.error(`${page} [${line}:${column}] ${message} (${ruleUrl})`);
					});
				});
			}
		}),
	);

	assert.strictEqual(errorsCount, 0);
});

test('All pages have valid BEM classes in markup', () => {
	let errorsCount = 0;

	PAGES.forEach((page, i) => {
		const result = bemLinter.lintBem({ content: markups[i], log: log.error, name: page });
		if (result.warningCount) {
			errorsCount++;
		}
	});

	assert.strictEqual(errorsCount, 0);
});

test('sitemap.xml is valid', async () => {
	const markup = await fetch(`${host}/sitemap.xml`).then((res) => res.text());
	const result = SyntaxValidator.validate(markup);
	const valid = result === true;

	if (!valid) {
		const { msg, line, col } = result.err;
		log.error(`sitemap.xml [${line}:${col}] ${msg}`);
	}

	assert.strictEqual(valid, true);
});

after(async () => {
	await closeApp(server);
});
