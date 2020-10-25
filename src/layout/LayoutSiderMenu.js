import { Menu, Icon } from 'ant-design-vue'

const { Item, SubMenu } = Menu
const menus = []
const menuKeys = new Set()

export function GenerateMenus (routes) {
  const filter = arr => arr.filter(item => {
    const ret = !!(item.path !== '*' && item.meta && item.meta.title && !item.meta.hide)
    if (ret && item.children) {
      item.children = filter(item.children)
    }
    return ret
  })
  const specialUrl = item => {
    if (item.meta && item.meta.type && item.meta.type === 'url') {
      item.path = '__url__' + item.path
      return true
    }
    return false
  }
  routes = filter(routes)
  routes.forEach(parent => {
    specialUrl(parent)
    menuKeys.add(parent.path)
    if (parent.children) {
      parent.children.forEach(child => {
        if (!specialUrl(child) && !child.path.startsWith('/')) {
          child.path = parent.path + '/' + child.path
        }
        menuKeys.add(child.path)
      })
    }
  })
  setTimeout(() => {
    menus.push(...routes)
  })
}

export default {
  name: 'LayoutSiderMenu',
  data () {
    return {
      selectedKeys: [],
      isClicked: false,
      menus,
    }
  },
  mounted () {
    this.changeSelected()
  },
  watch: {
    $route () {
      if (!this.isClicked) {
        this.changeSelected()
      }
    },
  },
  methods: {
    changeSelected () {
      if (menuKeys.has(this.$route.path)) {
        this.selectedKeys = [this.$route.path]
      }
    },
    menuClick ({ key: path }) {
      this.selectedKeys = [path]
      if (path.startsWith('__url__')) {
        return
      }
      this.isClicked = true
      this.$store.dispatch('openView', { path }).finally(() => {
        this.isClicked = false
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
    renderMenuItem (item) {
      const attrs = {}
      if (item.path.startsWith('__url__')) {
        Object.assign(attrs, {
          href: item.path.replace(/^__url__/, ''),
          target: '_blank',
        })
      }
      return <Item key={item.path}>
        <a {...{ attrs }}>
          {this.renderIcon(item.meta.icon)}
          <span>{item.meta.title}</span>
        </a>
      </Item>
    },
  },
  render () {
    const props = {
      mode: 'inline',
      theme: 'dark',
      selectedKeys: this.selectedKeys,
    }
    const on = {
      click: this.menuClick,
    }
    return <Menu {...{ props, on }}>
      {this.menus.map(item => {
        if (item.children && item.children.length > 0) {
          return <SubMenu
            key={item.path}
            scopedSlots={{
              title: () => (<span>
                {this.renderIcon(item.meta.icon)}
                <span>{item.meta.title}</span>
              </span>),
            }}
          >
            {item.children.map(child => this.renderMenuItem(child))}
          </SubMenu>
        } else {
          return this.renderMenuItem(item)
        }
      })}
    </Menu>
  },
}
