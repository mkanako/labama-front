import http from '@/utils/http'
import router, { GenerateRoutes } from '@/router'
import { once } from 'ramda'
import store from '@/store'

const init = once(data => {
  if (data.routeList) {
    GenerateRoutes(data.routeList)
  } else {
    return Promise.reject(Error('routeList not found'))
  }
  if (data.attachmentUrl) {
    window.attachmentUrl = data.attachmentUrl
  }
  return Promise.resolve()
})

export function sysInfo () {
  http.get('sysInfo', { showLoading: false })
    .then(resp => init(resp))
    .then(() => {
      if (router.currentRoute.name === 'login') {
        router.replace({ path: '/' })
      }
    })
}

export function login (param) {
  store.commit('SET_NAME', param.username)
  return http.post('login', param)
    .then(resp => init(resp))
    .then(() => {
      setTimeout(() => {
        router.replace({ path: '/' })
      }, 300)
      return Promise.resolve()
    })
}

export function changePassword (param) {
  return http.post('changePassword', param)
}

export function logout () {
  return http.get('logout')
    .then(() => {
      store.commit('SET_TOKEN', '')
      setTimeout(() => {
        router.replace({ name: 'login' })
          .then(() => window.location.reload())
      }, 300)
      return Promise.resolve()
    })
}
