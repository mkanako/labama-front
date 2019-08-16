import axios from 'axios'
import { message } from 'ant-design-vue'
// import { stringify } from 'qs'
import loading from '@/components/Loading'
import router from '@/router'

let loadingInstance

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000,
  // method: 'get',
  // responseType: 'text',
  // maxRedirects: 0,
  // transformResponse: [ data => data ],
  // transformRequest: [ data => stringify(data) ],
  showLoading: true,
})

http.interceptors.request.use(config => {
  config.showLoading = true
  if (config.showLoading) {
    loadingInstance = loading()
  }
  return config
})

http.interceptors.response.use(
  response => {
    if (response.config.showLoading) {
      loadingInstance && loadingInstance.close()
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
    loadingInstance && loadingInstance.close()
    if (!axios.isCancel(error)) {
      message.error(error.message)
      console.log(error)
    }
    return Promise.reject(error)
  })

export default http
