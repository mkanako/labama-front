import Vue from 'vue'
import Router from 'vue-router'
import defaultRoutes, { Page404 } from './defaultRoutes'
import dynamicRoutes from './dynamicRoutes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'
import { GenerateMenus } from '@/layout/LayoutSiderMenu'

Vue.use(Router)

Router.prototype.reload = function () {
  let currentView
  for (const key in this.app.$route.matched[1].instances) {
    currentView = this.app.$route.matched[1].instances[key]
    break
  }
  return this.app.$router.replace({
    path: this.app.$route.path,
    query: Object.assign({}, this.app.$route.query, { _t: +new Date() }),
  }).then(() => {
    if (currentView) {
      currentView.$destroy()
    }
  })
}

const router = new Router({
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: defaultRoutes,
  beforeEach: (to, from, next) => {
    NProgress.start()
    next()
  },
  afterEach: () => {
    NProgress.done()
  },
})

function allRoutes () {
  const isUrl = obj => {
    if (obj.meta && obj.meta.type && obj.meta.type === 'url') {
      return true
    }
    return /^https?:\/\//.test(obj.path)
  }
  function checkIsUrl (item) {
    item.isUrl = isUrl(item)
    if (item.children) {
      item.children.forEach(children => {
        checkIsUrl(children)
      })
    }
  }

  if (process.env.NODE_ENV === 'development') {
    const { PageTest } = require('./defaultRoutes')
    dynamicRoutes.push(PageTest)
  }
  dynamicRoutes.push(Page404)
  dynamicRoutes.forEach(item => {
    checkIsUrl(item)
    if (!item.isUrl && !item.component) {
      item.component = Layout
    }
  })
  return dynamicRoutes
}

export function GenerateRoutes (allowedRouteList) {
  const routes = allRoutes()
  if (!allowedRouteList.includes('*')) {
  }
  router.addRoutes(routes.filter(item => !item.isUrl).map(item => {
    if (item.children) {
      const children = item.children.filter(item => !item.isUrl)
      if (children.length !== item.children.length) {
        return Object.assign({}, item, { children })
      }
    }
    return item
  }))
  GenerateMenus(routes)
}

export default router
