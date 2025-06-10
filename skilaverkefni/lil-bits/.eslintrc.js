module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier & displays Prettier errors as ESLint errors
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Enforce component filenames to be PascalCase
    'react/jsx-pascal-case': 'error',
    // Hooks & general variables in camelCase
    camelcase: ['error', { properties: 'never', ignoreDestructuring: false }],
    // No unused variables/imports
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Always use semicolons
    semi: ['error', 'always'],
    // Prettier formatting wins
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
