import Vue from 'vue'
import Router from 'vue-router'
import defaultRoutes from './defaultRoutes'
import dynamicRoutes from './dynamicRoutes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layouts/BasicLayout'
import store from '@/store'

Vue.use(Router)

if (process.env.NODE_ENV === 'development') {
  dynamicRoutes.push(
    {
      path: '/test',
      meta: { title: 'test', icon: 'warning', },
      children: [
        {
          path: '',
          name: 'test',
          component: () => import('@/views/Test'),
        },
      ]
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
  const routes = dynamicRoutes
  routes.push({
    path: '*',
    name: '404',
    component: () => import('@/views/exception/404'),
  })
  routes.forEach(item => {
    if (!item.component) {
      item.component = Layout
    }
  })
  router.addRoutes(routes)
  store.dispatch('GenerateMenus', routes)
  if (router.currentRoute.name === 'login') {
    router.replace({ path: '/' })
  }
}

export default router
