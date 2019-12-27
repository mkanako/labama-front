
export default [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/analysis',
    meta: { title: 'home', icon: 'home', },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        meta: { title: '分析页', },
        component: () => import('@/views/Test'),
      },
      {
        path: 'https://www.baidu.com/',
        name: 'Monitor',
        meta: { title: '监控页（外部）', }
      },
      {
        path: 'workplace',
        name: 'Workplace',
        meta: { title: '工作台', },
        component: () => import('@/views/Test'),
      },
    ]
  },
]
