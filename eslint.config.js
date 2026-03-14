import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import vue from 'eslint-plugin-vue';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import vueEslintParser from 'vue-eslint-parser';

// 转换传统配置为 flat config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  // 使用 ESLint 推荐配置
  js.configs.recommended,
  // 使用浏览器和 Node 环境
  ...compat.env({
    browser: true,
    node: true,
    es2021: true,
  }),
  // Vue 文件配置
  {
    files: ['**/*.vue'],
    ignores: ['dist/**'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        parser: typescriptParser,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // 基本规则
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/attribute-hyphenation': 'off',
      'vue/require-default-prop': 'off',

      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  // TypeScript 文件配置
  {
    files: ['**/*.ts'],
    ignores: ['dist/**'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      // 基本规则
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  // JavaScript 文件配置
  {
    files: ['**/*.js'],
    ignores: ['dist/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      // 基本规则
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
    },
  },
];
