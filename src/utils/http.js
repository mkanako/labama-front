import axios from 'axios'
import { message } from 'ant-design-vue'
import Loading from '@/components/Loading'
import router from '@/router'
import store from '@/store'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000,
  showLoading: true,
})

http.interceptors.request.use(config => {
  if (config.showLoading === true) {
    Loading.open()
  }
  if (store.state.account.token) {
    config.headers.Authorization = store.state.account.token
  }
  return config
})

http.interceptors.response.use(
  response => {
    if (response.config.showLoading === true) {
      Loading.close()
    }
    if (response.headers.authorization) {
      store.commit('SET_TOKEN', response.headers.authorization)
    }
    if (response.data && typeof response.data === 'object') {
      switch (response.data.code) {
        case 0:
          return response.data.data
        case 1:
          message.error(response.data.msg)
          return Promise.reject(response.data)
        case -1:
          if (router.currentRoute.name !== 'login') {
            router.replace({ name: 'login' }).then(() => {
              window.location.reload()
            })
          }
          return Promise.reject(response.data)
      }
    }
    console.log(response)
    return Promise.reject(response)
  },
  error => {
    Loading.close()
    if (!axios.isCancel(error)) {
      message.error(error.message)
      console.log(error)
    }
    return Promise.reject(error)
  })

export default http
