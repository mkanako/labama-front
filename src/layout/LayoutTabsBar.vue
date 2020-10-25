<template>
  <a-tabs
    :active-key="tabActived"
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
    <template v-slot:tabBarExtraContent>
      <a-button
        shape="circle"
        icon="reload"
        size="small"
        type="link"
        :style="{ color: 'unset' }"
        @click="reload"
      />
    </template>
  </a-tabs>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'LayoutTabsBar',
  data () {
    return {
    }
  },
  watch: {
    $route () {
      this.$store.commit('SET_TAB_ACTIVED', this.$route.path)
    },
  },
  mounted () {
    this.$store.dispatch('createTab', { route: this.$route })
  },
  computed: {
    ...mapState({
      tabList: state => state.app.tabList,
      tabActived: state => state.app.tabActived,
    }),
  },
  methods: {
    onChange (targetKey) {
      this.$store.dispatch('activeTab', targetKey)
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      if (this.tabList.length <= 1) {
        return
      }
      this.$store.dispatch('closeTab', targetKey).then(index => {
        if (index !== false && targetKey === this.tabActived) {
          const prevIndex = index - 1
          let path
          if (prevIndex >= 0) {
            path = this.tabList[prevIndex].path
          } else {
            path = this.tabList[0].path
          }
          this.onChange(path)
        }
      })
    },
    reload () {
      this.$store.dispatch('reloadView')
    },
  },
}
</script>
