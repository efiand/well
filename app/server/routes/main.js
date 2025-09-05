import { RULES_TEMPLATE } from "#common/components/rules.js";
import { TABLE_TEMPLATE } from "#common/components/table.js";

export const mainRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				pageTemplate: RULES_TEMPLATE + TABLE_TEMPLATE,
			},
		};
	},
};
