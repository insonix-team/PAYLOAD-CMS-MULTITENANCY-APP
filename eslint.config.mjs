import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import { dirname } from 'path';
import typescript from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  js.configs.recommended,
  ...typescript.configs.recommended,
  prettier,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    ignores: [
      '.next/',
      'src/app/(payload)/admin/importMap.js',
      'src/payload-types.ts',
      'src/payload-generated-schema.ts',
      'tests/',
      'media/',
      'dist/',
      'node_modules/',
      'github/',
    ],
  },
];

export default eslintConfig;
