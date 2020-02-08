import Vue from 'vue'
import Router from 'vue-router'
import defaultRoutes, { Page404 } from './defaultRoutes'
import dynamicRoutes from './dynamicRoutes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout'
import store from '@/store'

Vue.use(Router)

function addExtraRoutes (routes) {
  if (process.env.NODE_ENV === 'development') {
    const { PageTest } = require('./defaultRoutes')
    routes.push(PageTest)
  }
  routes.push(Page404)
  routes.forEach(item => {
    if (!item.component) {
      item.component = Layout
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

export function GenerateRoutes (routeList) {
  const routes = dynamicRoutes.slice(0)

  addExtraRoutes(routes)
  router.addRoutes(routes)
  store.dispatch('GenerateMenus', routes)
}

export default router
