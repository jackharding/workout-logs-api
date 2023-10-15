module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  // made by CLI. do I need?
  // overrides: [
  // 	{
  // 		'env': {
  // 			'node': true
  // 		},
  // 		'files': [
  // 			'.eslintrc.{js,cjs}'
  // 		],
  // 		'parserOptions': {
  // 			'sourceType': 'script'
  // 		}
  // 	}
  // ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
