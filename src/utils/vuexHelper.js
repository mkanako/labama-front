import { path } from 'ramda'

const formatters = {
  camel: function (...args) {
    return args.shift() + args
      .map(text => text.replace(/\w/, c => c.toUpperCase()))
      .join('')
  },

  snake: function (...args) {
    return this
      .camel(...args)
      .replace(/([a-z])([A-Z])/g, (match, a, b) => a + '_' + b)
      .toLowerCase()
  },

  const: function (...args) {
    return this
      .snake(...args)
      .toUpperCase()
  },
}

export function makeMutations (state, parentKey = null) {
  return (Array.isArray(state) ? state : Object.keys(state))
    .reduce(function (obj, key) {
      const mutation = formatters.const('set', key)
      obj[mutation] = function (state, value) {
        if (parentKey) {
          state[parentKey][key] = value
        } else {
          state[key] = value
        }
      }
      return obj
    }, {})
}

export function mapFields (state, parentKey = null) {
  return Object.keys(state)
    .reduce(function (obj, key) {
      obj[key] = {
        get () {
          if (parentKey) {
            return path(parentKey.split('.').concat(key), this.$store.state)
          } else {
            return this.$store.state[key]
          }
        },
        set (value) {
          return this.$store.commit(formatters.const('set', key), value)
        },
      }
      return obj
    }, {})
}
