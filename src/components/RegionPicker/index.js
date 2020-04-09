import pca from './data/pca-code.json'
import core from './core'

export default {
  mixins: [core],
  data () {
    return {
      data: pca,
    }
  },
}
