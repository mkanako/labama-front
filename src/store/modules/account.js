import { makeMutations } from '@/utils/vuexHelper'

const state = {
  token: '',
  name: '',
}

export default {
  name: 'account',
  state,
  getters: {
    username: state => state.name,
  },
  mutations: {
    ...makeMutations(state),
  },
}
