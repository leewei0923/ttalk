module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'prettier',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    semi: ['off', 'always'],
    '@typescript-eslint/semi': ['off', 'always'],
    'space-before-function-paren': [0, 'always'],
    '@typescript-eslint/space-before-function-paren': [0, 'alway']
  }
};
