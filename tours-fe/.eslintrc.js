module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
    '.eslintrc.js', // Ignore this ESLint configuration file.
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {
    'require-jsdoc': 'off',
    quotes: ['error', 'single'],
    'import/no-unresolved': 0,
    indent: ['error', 2],
    'prettier/prettier': 'error',
    'object-curly-spacing': ['error', 'always'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
  },
};
