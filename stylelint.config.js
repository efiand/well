export default {
	extends: [
		'stylelint-config-standard',
		'stylelint-order-htmlacademy',
		'@stylistic/stylelint-config',
	],
	overrides: [
		{
			customSyntax: 'postcss-scss',
			files: ['**/*.scss'],
		},
	],
	processors: ['@mapbox/stylelint-processor-arbitrary-tags'],
	rules: {
		'@stylistic/color-hex-case': 'lower',
		'@stylistic/indentation': 'tab',
		'@stylistic/number-leading-zero': 'always',
		'@stylistic/number-no-trailing-zeros': true,
		'@stylistic/string-quotes': 'single',
		'alpha-value-notation': 'number',
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'content',
					'each',
					'else',
					'forward',
					'if',
					'include',
					'mixin',
					'page',
					'use',
				],
			},
		],
		'color-function-notation': 'legacy',
		'color-hex-length': 'long',
		'font-family-name-quotes': 'always-unless-keyword',
		'import-notation': 'string',
		'media-feature-range-notation': 'prefix',
		'number-max-precision': 6,
		'selector-class-pattern': [
			'^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)*(?:[.+])?$',
			{
				message: function expected(selectorValue) {
					return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
				},
				resolveNestedSelectors: true,
			},
		],
		'selector-pseudo-class-no-unknown': [
			true,
			{ ignorePseudoClasses: ['deep'] },
		],
		'value-keyword-case': [
			'lower',
			{ camelCaseSvgKeywords: true },
		],
	},
};
