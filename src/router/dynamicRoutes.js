
export default [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/page1',
    meta: { title: '主页', icon: 'home' },
    children: [
      {
        path: 'page1',
        name: 'page1',
        meta: { title: '页面1' },
        component: () => import('@/views/Test')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: { title: '页面2' },
        component: () => import('@/views/Test')
      },
      {
        path: 'https://www.baidu.com/',
        name: 'link',
        meta: { title: '外链' }
      },
    ]
  },
]
