import http from '@/utils/http'
import router, { GenerateRoutes } from '@/router'

const account = {
  state: {
    token: '',
    name: '',
  },
  getters: {
    username: state => state.name
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
  },
  actions: {
    Login ({ commit }, param) {
      return new Promise((resolve, reject) => {
        http.post('login', param).then(resp => {
          commit('SET_NAME', param.username)
          if (resp.routeList) {
            GenerateRoutes(resp.routeList)
          }
          if (resp.attachUrl) {
            window.attachUrl = resp.attachUrl
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    changePassword (conext, param) {
      return new Promise((resolve, reject) => {
        http.post('changePassword', param).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout () {
      return http.get('logout').finally(() => {
        router.replace({ name: 'login' }).then(() => {
          window.location.reload()
        })
      })
    }
  }
}

export default account
