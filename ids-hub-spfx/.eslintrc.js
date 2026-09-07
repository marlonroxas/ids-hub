// ESLint configuration for the project

module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-member-accessibility': ['warn', {
      accessibility: 'explicit',
      overrides: {
        constructors: 'no-public',
      },
    }],
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
    }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/react-in-jsx-scope': 'off',
  },
};
