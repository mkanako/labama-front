import { makeMutations } from '@/utils/vuexHelper'

const state = {
  token: '',
  name: '',
}

export default {
  state,
  getters: {
    username: state => state.name
  },
  mutations: {
    ...makeMutations(state),
  },
}
