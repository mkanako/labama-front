/**
 * primaryColor - 默认主题色
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * layoutMode - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * contentWidth - 内容区布局 : ['Fluid', 'Fixed'], only works when layoutMode is topmenu
 * fixedHeader - 固定 Header : boolean
 * fixedSidebar - 固定左侧菜单栏 : boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * colorWeak - 色盲模式 : boolean
 */
export default {
  primaryColor: '#1890FF',
  navTheme: 'dark',
  layoutMode: 'sidemenu',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixedSidebar: false,
  autoHideHeader: false,
  colorWeak: false,
  multiTab: false,
}

export const title = 'Admin'
