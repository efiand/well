import { RULES_TEMPLATE } from "#common/components/rules.js";
import { TABLE_TEMPLATE } from "#common/components/table.js";
import { html } from "#common/utils/mark-template.js";

export const mainRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				headTemplate: html`<meta name="yandex-verification" content="6891d630ad9271e6">`,
				pageTemplate: RULES_TEMPLATE + TABLE_TEMPLATE,
			},
		};
	},
};
