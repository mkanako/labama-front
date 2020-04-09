import p from './data/provinces.json'
import core from './core'

export default {
  props: {
    level: {
      type: Number,
      default: 1,
      validator (value) {
        return value === 1
      },
    },
  },
  mixins: [core],
  data () {
    return {
      data: p,
    }
  },
}
