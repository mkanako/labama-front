import pc from './data/pc-code.json'
import core from './core'

export default {
  props: {
    level: {
      type: Number,
      default: 2,
      validator (value) {
        return value >= 1 && value <= 2
      },
    },
  },
  mixins: [core],
  data () {
    return {
      data: pc,
    }
  },
}
