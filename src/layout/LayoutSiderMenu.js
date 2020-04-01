import { Menu, Icon } from 'ant-design-vue'
import { pick } from 'ramda'
import mixin from './mixin'

const { Item, SubMenu } = Menu
const menus = []

export function GenerateMenus (routes) {
  const pickUp = arr => arr.map(item => {
    item = pick(['path', 'meta', 'children'], item)
    if (item.children) {
      if (item.children.length === 0) {
        delete item.children
      } else {
        item.children = pickUp(item.children)
      }
    }
    return item
  })
  const filter = arr => arr.filter(item => {
    const ret = item.path !== '*' && item.meta && item.meta.title && !item.meta.hide
    if (ret && item.children) {
      item.children = filter(item.children)
    }
    return ret
  })
  menus.push(...pickUp(filter(routes)))
}

export default {
  name: 'LayoutSiderMenu',
  data () {
    return {
      openKeys: [],
      openKeysCopy: [],
      selectedKeys: [],
      isClickTrigger: false,
      menus,
    }
  },
  mixins: [mixin],
  computed: {
    rootSubmenuKeys () {
      return this.menus.map(item => item.path)
    },
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
                query: Object.assign({}, this.$route.query, { _t: +new Date() })
              }).finally(() => {
                this.isClickTrigger = false
              })
            } else {
              this.$router.push({
                path: menu.path
              }).finally(() => {
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
      select: ({ item, selectedKeys }) => {
        if (this.collapsed && item.parentMenu.eventKey) {
          this.openKeysCopy = [item.parentMenu.eventKey]
        }
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