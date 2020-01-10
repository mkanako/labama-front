import { Menu, Icon } from 'ant-design-vue'
import { mapState } from 'vuex'

const { Item, SubMenu } = Menu

export default {
  name: 'LayoutSiderMenu',
  data () {
    return {
      openKeys: [],
      openKeysCopy: [],
      selectedKeys: [],
      isClickTrigger: false,
    }
  },
  computed: {
    rootSubmenuKeys () {
      return this.menus.map(item => item.path)
    },
    ...mapState({
      menus: state => state.app.menus,
      collapsed: state => !state.app.sidebar,
    }),
  },
  mounted () {
    this.updateState()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.openKeysCopy = this.openKeys
        this.openKeys = []
      } else {
        this.openKeys = this.openKeysCopy
      }
    },
    $route () {
      if (!this.isClickTrigger) {
        this.updateState()
      }
    }
  },
  methods: {
    updateState () {
      const [parentRoute, childRoute] = this.$route.matched
      if (parentRoute && childRoute) {
        this.openKeysCopy = [parentRoute.path]
        if (!this.collapsed) {
          this.openKeys = this.openKeysCopy
        }
        if (childRoute.meta.hide) {
          this.selectedKeys = this.openKeysCopy
        } else {
          this.selectedKeys = [childRoute.path.replace(/\/$/, '')]
        }
      }
    },
    openChange (openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    renderIcon (icon) {
      if (icon) {
        const props = {
          [typeof icon === 'object' ? 'component' : 'type']: icon
        }
        return <Icon {...{ props }}/>
      } else {
        return null
      }
    },
    renderMenuItem (menu, parent = null) {
      const isUrl = /^https?:\/\//.test(menu.path) || (menu.meta.type && menu.meta.type === 'url')
      const params = {}
      if (isUrl) {
        params.attrs = {
          href: menu.path,
          target: '_blank',
        }
      } else {
        if (parent && !menu.path.startsWith('/')) {
          menu.path = parent.path + '/' + menu.path
        }
        params.on = {
          click: () => {
            this.isClickTrigger = true
            if (this.$route.path === menu.path) {
              this.$router.replace({
                path: menu.path,
                query: { t: +new Date() }
              }).finally(() => {
                this.isClickTrigger = false
              })
            } else {
              this.$router.push({ path: menu.path }).finally(() => {
                this.isClickTrigger = false
              })
            }
          }
        }
      }
      return <Item key={menu.path}>
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
      select: ({ selectedKeys }) => {
        this.selectedKeys = selectedKeys
      }
    }
    return <Menu {...{ props, on }}>
      {this.menus.map(item => {
        if (item.children) {
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
  }
}
