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
  component: () => import('@/views/exception/404'),
}

export const PageTest = {
  path: '/test',
  meta: { title: 'test', icon: 'warning' },
  children: [
    {
      path: '',
      name: 'test',
      component: () => import('@/views/Test'),
    },
  ]
}
