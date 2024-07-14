/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'alpha-value-notation': 'number',
    'color-hex-length': null,
    'color-function-notation': 'legacy',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignoreComments: ['endregion'],
      },
    ],
    'custom-property-empty-line-before': null,
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [':export'],
      },
    ],
    'no-duplicate-selectors': null,
    'selector-not-notation': 'simple',
    'selector-class-pattern': null,
    // 'selector-type-no-unknown': [
    //   true,
    //   {
    //     ignoreTypes: ['/^taro-/', 'page'],
    //   },
    // ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'global'],
      },
    ],
    'no-descending-specificity': null,
    'scss/at-import-partial-extension': 'always',
    'scss/double-slash-comment-empty-line-before': null,
  },
};
