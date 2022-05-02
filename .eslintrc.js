const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: { browser: true, jest: true, node: true },
  plugins: ['import', 'simple-import-sort'],
  extends: [
    'next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      { selector: 'TSEnumDeclaration', message: "Don't declare enums" },
    ],
    'prefer-arrow-callback': 'error',
    'func-style': ['error', 'expression'],
    'import/newline-after-import': 'error',
    'no-restricted-imports': ['error', { patterns: ['./', '../'] }],
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}

module.exports = config
