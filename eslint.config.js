import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: [],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // sortowanie importów
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // usuwanie duplikatów importów
      'import/no-duplicates': 'error',

      // usuwanie nieużywanych importów
      'unused-imports/no-unused-imports': 'error',
    },
  },
];
