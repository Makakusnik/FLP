module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'svelte/block-lang': [
			'error',
			{
				enforceScriptPresent: false,
				enforceStylePresent: false,
				script: 'ts', // a list of languages or null to signify no language specified
				style: ['postcss', null] // same as for script, a single value can be used instead of an array.
			}
		],
		'@typescript-eslint/no-unused-vars': 'error'
	},
	globals: {
		$$Generic: 'readonly'
	}
};
