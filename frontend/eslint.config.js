import nextPlugin from '@portfolio/eslint-config';
import prettierPlugin from 'eslint-plugin-prettier';
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
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
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
