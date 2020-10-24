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
  const instances = this.app.$route.matched[this.app.$route.matched.length - 1].instances
  for (const key in instances) {
    instances[key].$destroy()
  }
  return this.app.$router.replace({
    path: this.app.$route.path,
    query: Object.assign({}, this.app.$route.query, { _t: +new Date() }),
  })
}

const router = new Router({
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: defaultRoutes,
})

function isUrl (obj) {
  if (obj && obj.type && obj.type === 'url') {
    return true
  }
  return false
}

function normalizeRoutes () {
  function ensureIsUrl (item) {
    if (!isUrl(item.meta)) {
      if (/^https?:\/\//.test(item.path)) {
        if (!item.meta) {
          item.meta = {}
        }
        item.meta.type = 'url'
      }
    }
    if (item.children) {
      item.children.forEach(children => {
        ensureIsUrl(children)
      })
    }
  }

  if (process.env.NODE_ENV === 'development') {
    const { PageTest } = require('./defaultRoutes')
    dynamicRoutes.push(PageTest)
  }
  dynamicRoutes.push(Page404)
  dynamicRoutes.forEach(item => {
    ensureIsUrl(item)
    if (!isUrl(item.meta) && !item.component) {
      item.component = Layout
    }
  })
  return dynamicRoutes
}

export function GenerateRoutes (allowedRouteList) {
  normalizeRoutes()
  if (!allowedRouteList.includes('*')) {
  }
  const routes = dynamicRoutes.filter(item => !isUrl(item.meta)).map(item => {
    if (item.children) {
      const children = item.children.filter(item => !isUrl(item.meta))
      if (children.length !== item.children.length) {
        return Object.assign({}, item, { children })
      }
    }
    return item
  })
  router.addRoutes(routes)
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })
  router.afterEach(() => {
    NProgress.done()
  })
  GenerateMenus(dynamicRoutes)
}

export default router
