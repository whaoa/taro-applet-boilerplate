import eslint from '@antfu/eslint-config';

import originalReactPlugin from 'eslint-plugin-react';

import taroVariableConfig from 'eslint-config-taro/rules/variables.js';
import taroJsxConfig from 'eslint-config-taro/rules/jsx.js';

const legacyOriginalReactPluginName = 'react';
const legacyOriginalReactPluginPrefix = `${legacyOriginalReactPluginName}/`;
const currentOriginalReactPluginName = 'o-react';
const currentOriginalReactPluginPrefix = `${currentOriginalReactPluginName}/`;

const taroBuiltInRules = {};

[taroVariableConfig, taroJsxConfig].forEach((config) => {
  Object.keys(config.rules).forEach((key) => {
    const value = config.rules[key];
    if (key.startsWith(legacyOriginalReactPluginPrefix)) {
      key = key.replace(legacyOriginalReactPluginPrefix, currentOriginalReactPluginPrefix);
    }
    taroBuiltInRules[key] = value;
  });
});

export default eslint(
  {
    react: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
  },

  // extend taro built-in rules
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      [currentOriginalReactPluginName]: originalReactPlugin,
    },
    settings: {
      ...taroJsxConfig.settings,
      [legacyOriginalReactPluginName]: {
        version: 'detect',
      },
    },
    rules: {
      ...taroBuiltInRules,
      'jsx-quotes': 'off',
      [`${currentOriginalReactPluginName}/react-in-jsx-scope`]: 'off',
      [`${currentOriginalReactPluginName}/jsx-uses-react`]: 'off',
    },
  },
  {
    files: ['src/app.config.{js,ts}'],
    languageOptions: {
      globals: {
        defineAppConfig: 'readable',
      },
    },
  },
  {
    files: ['src/pages/**/*.config.{js,ts}'],
    languageOptions: {
      globals: {
        definePageConfig: 'readable',
      },
    },
  },

  // override rules
  {
    rules: {
      'curly': ['error', 'all'],
      'no-unused-vars': 'off',
      'style/max-len': [
        'error',
        {
          code: 100,
          ignoreComments: false,
          ignoreTrailingComments: false,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'style/arrow-parens': ['error', 'always'],
      'style/jsx-quotes': ['error', 'prefer-double'],
      'style/multiline-ternary': ['error', 'always-multiline', { ignoreJSX: true }],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always-and-inside-groups',
          'pathGroupsExcludedImportTypes': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
        },
      ],
      'ts/no-unused-vars': 'error',
    },
  },
  {
    files: ['tsconfig.json'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
);
