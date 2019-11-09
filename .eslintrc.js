module.exports = {
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'no-var': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',

    // react plugin - options
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-key': 'warn',
    'react/jsx-no-undef': 'error',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
  extends: ['plugin:jsx-a11y/recommended'],
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11, // optional, recommended 6+
  },
}
