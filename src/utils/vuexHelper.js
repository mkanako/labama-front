const formatters = {
  camel (...args) {
    return args.shift() + args
      .map(text => text.replace(/\w/, c => c.toUpperCase()))
      .join('')
  },

  snake (...args) {
    return this
      .camel(...args)
      .replace(/([a-z])([A-Z])/g, (match, a, b) => a + '_' + b)
      .toLowerCase()
  },

  const (...args) {
    return this
      .snake(...args)
      .toUpperCase()
  },
}

export function makeMutations (state, parentKey = null) {
  return (Array.isArray(state) ? state : Object.keys(state))
    .reduce((mutations, key) => {
      const mutationName = formatters.const('set', key)
      mutations[mutationName] = function (state, value) {
        if (parentKey) {
          state[parentKey][key] = value
        } else {
          state[key] = value
        }
      }
      return mutations
    }, {})
}

export function syncFields (state, parentKey = null) {
  return Object.keys(state)
    .reduce((handlers, key) => {
      handlers[key] = {
        get () {
          if (parentKey) {
            return this.$store.state[parentKey][key]
          } else {
            return this.$store.state[key]
          }
        },
        set (value) {
          this.$store.commit(formatters.const('set', key), value)
        },
      }
      return handlers
    }, {})
}
