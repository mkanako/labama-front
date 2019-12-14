import { Menu, Icon } from 'ant-design-vue'

const { Item, SubMenu } = Menu

export default {
  name: 'SMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menu.forEach(item => keys.push(item.path))
      return keys
    }
  },
  mounted () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    $route: function () {
      this.updateMenu()
    }
  },
  methods: {
    // select menu item
    onOpenChange (openKeys) {
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      // 非水平模式时
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    updateMenu () {
      const routes = this.$route.matched.concat()
      const { hidden } = this.$route.meta
      if (routes.length >= 3 && hidden) {
        routes.pop()
        this.selectedKeys = [routes[routes.length - 1].path]
      } else {
        this.selectedKeys = [routes.pop().path]
      }
      const openKeys = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }

      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },

    // render
    renderItem (menu, parent = null) {
      if (!menu.hidden) {
        if (menu.children && menu.children.length === 1) {
          return this.renderMenuItem(menu)
        }
        return menu.children && !menu.hideChildren ? this.renderSubMenu(menu) : this.renderMenuItem(menu, parent)
      }
      return null
    },
    renderMenuItem (menu, parent = null) {
      const tag = (/^https?:\/\//.test(menu.path) || (menu.meta && menu.meta.type && menu.meta.type === 'url')) ? 'a' : 'router-link'
      let param
      if (tag === 'a') {
        param = {
          attrs: { href: menu.path, target: '_blank' }
        }
      } else {
        if (parent && !menu.path.startsWith('/')) {
          menu.path = parent.path + '/' + menu.path
        }
        param = {
          props: { to: { path: menu.path, query: { t: +new Date() } } }
        }
      }

      if (menu.children && menu.hideChildren) {
        // 把有子菜单的 并且 父菜单是要隐藏子菜单的
        // 都给子菜单增加一个 hidden 属性
        // 用来给刷新页面时， selectedKeys 做控制用
        menu.children.forEach(item => {
          item.meta = Object.assign({}, item.meta || {}, { hidden: true })
        })
      }

      return (
        <Item {...{ key: menu.path }}>
          <tag {...param}>
            {this.renderIcon(menu)}
            <span>{menu.meta.title}</span>
          </tag>
        </Item>
      )
    },
    renderSubMenu (menu) {
      const itemArr = []
      if (!menu.hideChildren) {
        menu.children.forEach(item => {
          itemArr.push(this.renderItem(item, menu))
        })
      }
      return (
        <SubMenu {...{ key: menu.path }}>
          <span slot="title">
            {this.renderIcon(menu)}
            <span>{menu.meta.title}</span>
          </span>
          {itemArr}
        </SubMenu>
      )
    },
    renderIcon (menu) {
      if (menu.meta && menu.meta.icon) {
        const icon = menu.meta.icon
        const props = {}
        typeof (icon) === 'object' ? props.component = icon : props.type = icon
        return (
          <Icon {... { props } }/>
        )
      } else {
        return null
      }
    }
  },

  render () {
    const { mode, theme, menu } = this
    const props = {
      mode: mode,
      theme: theme,
      openKeys: this.openKeys
    }
    const on = {
      select: obj => {
        this.selectedKeys = obj.selectedKeys
        this.$emit('select', obj)
      },
      openChange: this.onOpenChange
    }

    const menuTree = menu.map(item => {
      if (item.hidden) {
        return null
      }
      return this.renderItem(item)
    })
    // {...{ props, on: on }}
    return (
      <Menu vModel={this.selectedKeys} {...{ props, on: on }}>
        {menuTree}
      </Menu>
    )
  }
}
