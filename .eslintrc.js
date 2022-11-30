module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier'
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
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['off', 'always'],
    '@typescript-eslint/semi': ['off', 'always'],
    'space-before-function-paren': [0, 'always'],
    '@typescript-eslint/space-before-function-paren': [0, 'alway'],
    'multiline-ternary': [0, 'always'],
    '@typescript-eslint/naming-convention': [0, 'always']
  }
};
