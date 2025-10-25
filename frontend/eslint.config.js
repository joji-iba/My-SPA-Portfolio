import js from '@eslint/js';
import nextPlugin from 'eslint-config-next';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
// react-hooks plugin removed due to peer dependency conflicts with eslint v9
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/', '.next/', 'dist/'],
  },
  // Merge Next.js configs manually to avoid duplicate plugin definitions
  ...nextPlugin,
  // Custom project config (adds TS/React/import/prettier rules on top of Next.js)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'import/order': 'off',
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          endOfLine: 'lf',
          semi: true,
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
    },
  },
];
