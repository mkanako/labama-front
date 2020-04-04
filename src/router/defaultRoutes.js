import Login from '@/views/Login'

export default [
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
]

export const Page404 = {
  path: '*',
  name: 'Page404',
  component: () => import('@/views/exception'),
  props: { type: 404 },
}

export const PageTest = {
  path: '/testdev',
  meta: { title: '开发测试', icon: 'warning' },
  children: [
    {
      path: '',
      name: 'TestDev',
      component: () => import('@/views/Test.dev'),
    },
  ],
}
