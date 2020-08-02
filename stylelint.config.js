module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'no-descending-specificity': null,
    'no-empty-source': null,
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['tailwind'],
    }],
  },
  ignoreFiles: [
    './src/views/Test.dev.vue',
    './public/index.html',
    './dist/**',
  ],
}
