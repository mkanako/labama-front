import zhCN from 'ant-design-vue/lib/locale/zh_CN'

const config = {
  autoInsertSpaceInButton: false,
  locale: zhCN,
}

export default {
  name: 'AppConfigProvider',
  functional: true,
  render: (h, context) => <a-config-provider props={config}>{context.children}</a-config-provider>,
}
