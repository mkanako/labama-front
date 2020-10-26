module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  env: {
    development: {
      plugins: ['dynamic-import-node'],
    },
  },
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
}
