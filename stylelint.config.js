module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'no-descending-specificity': null,
  },
  ignoreFiles: [
    './src/views/Test.dev.vue',
    './public/index.html',
  ],
}
