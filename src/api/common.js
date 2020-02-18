import http from '@/utils/http'
import router, { GenerateRoutes } from '@/router'
import { once } from 'ramda'

const init = once(data => {
  if (data.routeList) {
    GenerateRoutes(data.routeList)
  } else {
    return Promise.reject(Error('routeList not found'))
  }
  if (data.attachUrl) {
    window.attachUrl = data.attachUrl
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
  return http.post('login', param)
    .then(resp => init(resp))
}

export function changePassword (param) {
  return http.post('changePassword', param)
}

export function logout () {
  return http.get('logout')
    .then(() => router.replace({ name: 'login' }))
}
