module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': ['error', 'always'],
    'no-extra-parens': ['error', 'all', {
      nestedBinaryExpressions: false
    }],
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],
    'vue/attribute-hyphenation': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/max-len': ['error', {
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreHTMLAttributeValues: true,
      ignoreHTMLTextContents: true
    }]
  }
}
