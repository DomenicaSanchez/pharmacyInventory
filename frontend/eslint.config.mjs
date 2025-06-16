import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import babelParser from '@babel/eslint-parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: tsParser,
        project: './tsconfig.json',
      },
    },
    plugins: {
      astro,
    },
    rules: {
      'astro/no-unused-css-selector': 'warn',
    },
  },


  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,  // aquí se usa el parser importado
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      parser: babelParser,  // aquí también el parser importado
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  prettier
);
