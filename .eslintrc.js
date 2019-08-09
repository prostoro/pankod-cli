module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint'
	],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		project: 'tsconfig.json',
	},
	rules: {
		// Disabled Rules
		'@typescript-eslint/camelcase': ['error', { properties: 'never' }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-member-accessibility': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-object-literal-type-assertion': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-magic-numbers': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-type-alias': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-object-literal-type-assertion': 'off',
		'@typescript-eslint/prefer-interface': 'off',
		'no-console': 'off',
		// Enabled rules
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': 'error',
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/class-name-casing': 'error',
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-triple-slash-reference': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-parameter-properties': 'error',
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-angle-bracket-type-assertion': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/restrict-plus-operands': 'error',
		'@typescript-eslint/semi': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/unified-signatures': 'error',
		complexity: ['error', { max: 4 }],
		'max-depth': ['error', { max: 4 }],
		'prefer-const': [
			'error',
			{
				destructuring: 'all',
				ignoreReadBeforeAssign: true,
			},
		],
		"max-len": ['error', { code: 120, tabWidth: 4 }]
	},
};
