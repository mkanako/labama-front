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
  component: () => import('@/views/Exception'),
  props: { type: 404 },
}

export const PageTest = {
  path: '/devtest',
  meta: { title: '开发测试', icon: 'bug' },
  children: [
    {
      path: 'page1',
      meta: { title: '页面1' },
      component: () => import('@/views/DevTest'),
    },
    {
      path: 'page2',
      meta: { title: '页面2' },
      component: {
        name: 'DevTestPage2',
        render: h => h('div', (new Date()).toString()),
      },
    },
    {
      path: 'page3',
      meta: { title: '页面3' },
      component: {
        name: 'DevTestPage3',
        render: h => h('div', (new Date()).toString()),
      },
    },
    {
      path: 'https://www.baidu.com/',
      meta: { title: '外链' },
    },
  ],
}
