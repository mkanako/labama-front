
export default [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
  },
  {
    path: '/home',
    meta: { title: '主页', icon: 'home' },
    children: [
      {
        path: '',
        component: {
          name: 'HomePage',
          render: h => h('div', 'HomePage'),
        },
      },
    ],
  },
]
