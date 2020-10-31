const R = require('ramda')
const defaultTheme = require('tailwindcss/defaultTheme')

function getAntdColors (colors = []) {
  const { red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } = require('@ant-design/colors')
  const AntdColorsList = { red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey }
  const list = {}
  colors.forEach(color => {
    if (AntdColorsList[color]) {
      list[color] = R.zipObj(R.range(1, color === 'grey' ? 9 : 11), AntdColorsList[color])
    }
  })
  return list
}

const enablePlugins = [
  'backgroundColor',
  'cursor',
  'display',
  'fontSize',
  'fontWeight',
  'height',
  'lineHeight',
  'margin',
  'overflow',
  'padding',
  'textAlign',
  'textColor',
  'verticalAlign',
  'width',
]

module.exports = {
  corePlugins: enablePlugins,
  theme: {
    colors: {
      ...R.pickBy(val => typeof val === 'string', defaultTheme.colors),
      ...getAntdColors(['blue', 'grey']),
    },
    screens: R.omit(['xl'], defaultTheme.screens),
    spacing: Object
      .keys(defaultTheme.spacing)
      .filter(item => !isNaN(item))
      .reduce((acc, item) => {
        acc[item] = item + (item > 0 ? 'px' : '')
        return acc
      }, {}),
    extend: {
      fontSize: theme => R.pickBy((_, key) => key >= 12, theme('spacing')),
    },
  },
  variants: {
    ...enablePlugins.reduce((acc, item) => {
      const used = [
        'width',
      ]
      if (!used.includes(item)) {
        acc[item] = []
      }
      return acc
    }, {}),
  },
  plugins: [],
}
