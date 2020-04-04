const R = require('ramda')
const defaultTheme = require('tailwindcss/defaultTheme')

function getAntdColors (colors = []) {
  const { red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } = require('@ant-design/colors')
  const antdColorsList = { red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey }
  const list = {}
  colors.forEach(color => {
    if (antdColorsList[color]) {
      if (color === 'grey') {
        list[color] = R.zipObj(R.range(1, 9), antdColorsList[color])
      } else {
        list[color] = R.zipObj(R.range(1, 11), antdColorsList[color])
      }
    }
  })
  return list
}

const enablePlugins = [
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
    spacing: R.fromPairs(
      Object
        .keys(defaultTheme.spacing)
        .filter(item => !isNaN(item))
        .map(item => [item, item + (item > 0 ? 'px' : '')]),
    ),
    extend: {
      fontSize: theme => theme('spacing'),
      lineHeight: theme => theme('spacing'),
    },
  },
  variants: {
    ...R.fromPairs(
      enablePlugins
        .filter(item => !['width'].includes(item))
        .map(item => [item, []]),
    ),
  },
  plugins: [],
}
