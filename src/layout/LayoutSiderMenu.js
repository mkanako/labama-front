import { Menu, Icon } from 'ant-design-vue'

const { Item, SubMenu } = Menu
const menus = []

export function GenerateMenus (routes) {
  const filter = arr => arr.filter(item => {
    const ret = item.path !== '*' && item.meta && item.meta.title && !item.meta.hide
    if (ret && item.children) {
      item.children = filter(item.children)
    }
    return ret
  })
  menus.push(...filter(routes))
}

export default {
  name: 'LayoutSiderMenu',
  data () {
    return {
      selectedKeys: [],
      openKeys: [],
      isClickTrigger: false,
      menus,
    }
  },
  mounted () {
    this.updateMenu()
  },
  watch: {
    $route () {
      if (!this.isClickTrigger) {
        this.updateMenu()
      }
    },
  },
  methods: {
    updateMenu () {
      const [parentRoute, childRoute] = this.$route.matched
      if (parentRoute && childRoute) {
        this.openKeys.push(parentRoute.path)
        if (!childRoute.meta.hide) {
          this.selectedKeys = [childRoute.path.replace(/\/$/, '')]
        }
      }
    },
    openChange (keys) {
      this.openKeys = keys
    },
    menuClick ({ key: path }) {
      this.selectedKeys = [path]
      if (path.startsWith('__url__')) {
        return
      }
      this.isClickTrigger = true
      let promise
      if (this.$route.path === path) {
        promise = this.$router.replace({
          path,
          query: Object.assign({}, this.$route.query, { _t: +new Date() }),
        })
      } else {
        promise = this.$router.push({ path })
      }
      promise.then(route => {
        // console.log(route)
      }).finally(() => {
        this.isClickTrigger = false
      })
    },
    renderIcon (icon) {
      if (icon) {
        const props = {
          [typeof icon === 'object' ? 'component' : 'type']: icon,
        }
        return <Icon {...{ props }}/>
      } else {
        return null
      }
    },
    renderMenuItem (menu, parent = null) {
      const params = {}
      let path = menu.path
      if (menu.isUrl) {
        params.attrs = {
          href: path,
          target: '_blank',
        }
        path = '__url__' + path
      } else {
        if (parent && !menu.path.startsWith('/')) {
          path = parent.path + '/' + menu.path
        }
      }
      return <Item key={path}>
        <a {...params}>
          {this.renderIcon(menu.meta.icon)}
          <span>{menu.meta.title}</span>
        </a>
      </Item>
    },
  },
  render () {
    const props = {
      mode: 'inline',
      theme: 'dark',
      openKeys: this.openKeys,
      selectedKeys: this.selectedKeys,
    }
    const on = {
      openChange: this.openChange,
      click: this.menuClick,
    }
    return <Menu {...{ props, on }}>
      {this.menus.map(item => {
        if (item.children && item.children.length > 0) {
          return <SubMenu key={item.path}>
            <span slot="title">
              {this.renderIcon(item.meta.icon)}
              <span>{item.meta.title}</span>
            </span>
            {item.children.map(child => this.renderMenuItem(child, item))}
          </SubMenu>
        } else {
          return this.renderMenuItem(item)
        }
      })}
    </Menu>
  },
}
