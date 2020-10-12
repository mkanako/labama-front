<template>
  <a-tabs
    :active-key="tabActive"
    tab-position="top"
    type="editable-card"
    @edit="onEdit"
    @change="onChange"
    hide-add
    :tab-bar-style="{ margin: 0 }"
  >
    <a-tab-pane
      v-for="tab in tabList"
      :key="tab.path"
      :tab="tab.title"
      :closable="tabList.length > 1"
    />
    <a-button
      slot="tabBarExtraContent"
      shape="circle"
      icon="reload"
      size="small"
      type="link"
      :style="{ color: 'unset' }"
      @click="reload"
    />
  </a-tabs>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'LayoutTabsBar',
  data () {
    return {
      tabActive: '',
    }
  },
  computed: {
    ...mapState({
      tabList: state => state.app.tabList,
    }),
    ...mapGetters([
      'findTab',
    ]),
  },
  watch: {
    $route: {
      handler (route) {
        const { path, query, meta } = route
        const title = meta.title || route.matched[0].meta.title
        if (meta.hide || route.matched[0].meta.hide || !title) {
          return
        }
        let cachedView
        for (const key in route.matched[1].components) {
          cachedView = route.matched[1].components[key].name
          if (cachedView) {
            this.ADD_CACHED_VIEW(cachedView)
            break
          }
        }
        const tab = { title, path, query, cachedView }
        this.OPEN_TAB(tab)
        this.tabActive = path
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations([
      'OPEN_TAB',
      'ADD_CACHED_VIEW',
      'REMOVE_CACHED_VIEW',
      'SET_TAB_LIST',
    ]),
    onChange (targetKey) {
      const tab = this.findTab(targetKey)
      if (tab) {
        this.$router.push({ path: tab.path, query: tab.query }).then(() => {
          this.tabActive = tab.path
        })
      }
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      if (this.tabList.length <= 1) {
        return
      }
      let tabActive = this.tabActive
      let lastIndex, cachedView
      this.tabList.some((tab, index) => {
        if (tab.path === targetKey) {
          cachedView = tab.cachedView
          lastIndex = index - 1
          return true
        }
      })
      const tabList = this.tabList.filter(tab => tab.path !== targetKey)
      if (tabList.length && tabActive === targetKey) {
        if (lastIndex >= 0) {
          tabActive = tabList[lastIndex].path
        } else {
          tabActive = tabList[0].path
        }
        this.onChange(tabActive)
      }
      this.SET_TAB_LIST(tabList)
      this.tabActive = tabActive
      this.REMOVE_CACHED_VIEW(cachedView)
    },
    reload () {
      this.$router.reload()
    },
  },
}
</script>
