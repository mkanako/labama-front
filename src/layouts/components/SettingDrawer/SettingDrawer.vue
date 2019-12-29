<template>
  <a-drawer
    width="300"
    placement="right"
    @close="visible = false"
    :closable="false"
    :visible="visible"
    wrap-class-name="setting-drawer"
    :handle="handle"
  >
    <div class="item">
      <h3 class="title">
        整体风格设置
      </h3>
      <div class="block-checkbox">
        <a-tooltip>
          <template slot="title">
            暗色菜单风格
          </template>
          <div
            class="checkbox-item"
            @click="changeNavTheme('dark')"
          >
            <img
              src="./imgs/dark.svg?datauri"
              alt="dark"
            >
            <div
              class="select-icon"
              v-if="navTheme === 'dark'"
            >
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">
            亮色菜单风格
          </template>
          <div
            class="checkbox-item"
            @click="changeNavTheme('light')"
          >
            <img
              src="./imgs/light.svg?datauri"
              alt="light"
            >
            <div
              class="select-icon"
              v-if="navTheme !== 'dark'"
            >
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>
      </div>
    </div>

    <div class="item">
      <h3 class="title">
        主题色
      </h3>
      <div style="height: 20px">
        <a-tooltip
          class="theme-color-list"
          v-for="(item, index) in colorList"
          :key="index"
        >
          <template slot="title">
            {{ item.key }}
          </template>
          <a-tag
            :color="item.color"
            @click="changePrimaryColor(item.color)"
          >
            <a-icon
              type="check"
              v-if="item.color === primaryColor"
            />
          </a-tag>
        </a-tooltip>
      </div>
    </div>
    <a-divider />

    <div class="item">
      <h3 class="title">
        导航模式
      </h3>
      <div class="block-checkbox">
        <a-tooltip>
          <template slot="title">
            侧边栏导航
          </template>
          <div
            class="checkbox-item"
            @click="changeLayoutMode('sidemenu')"
          >
            <img
              src="./imgs/dark.svg?datauri"
              alt="sidemenu"
            >
            <div
              class="select-icon"
              v-if="layoutMode === 'sidemenu'"
            >
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">
            顶部栏导航
          </template>
          <div
            class="checkbox-item"
            @click="changeLayoutMode('topmenu')"
          >
            <img
              src="./imgs/topmenu.svg?datauri"
              alt="topmenu"
            >
            <div
              class="select-icon"
              v-if="layoutMode !== 'sidemenu'"
            >
              <a-icon type="check" />
            </div>
          </div>
        </a-tooltip>
      </div>

      <div class="item">
        <a-list :split="false">
          <a-list-item>
            <a-tooltip slot="actions">
              <template slot="title">
                该设定仅 [顶部栏导航] 时有效
              </template>
              <a-select
                size="small"
                style="width: 80px;"
                :default-value="contentWidth"
                :value="contentWidth"
                @change="changeContentWidth"
                :disabled="layoutMode === 'sidemenu'"
              >
                <a-select-option value="Fixed">
                  固定
                </a-select-option>
                <a-select-option value="Fluid">
                  流式
                </a-select-option>
              </a-select>
            </a-tooltip>
            <a-list-item-meta>
              <div slot="title">
                内容区域宽度
              </div>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :default-checked="fixedHeader"
              :checked="fixedHeader"
              @change="toggleFixedHeader"
            />
            <a-list-item-meta>
              <div slot="title">
                固定 Header
              </div>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :disabled="!fixedHeader"
              :default-checked="autoHideHeader"
              :checked="autoHideHeader"
              @change="toggleAutoHideHeader"
            />
            <a-list-item-meta>
              <a-tooltip
                slot="title"
                placement="left"
              >
                <template slot="title">
                  固定 Header 时可配置
                </template>
                <div :style="{ opacity: !fixedHeader ? '0.5' : '1' }">
                  下滑时隐藏 Header
                </div>
              </a-tooltip>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :disabled="(layoutMode === 'topmenu')"
              :default-checked="fixedSidebar"
              :checked="fixedSidebar"
              @change="toggleFixedSidebar"
            />
            <a-list-item-meta>
              <div
                slot="title"
                :style="{ textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset' }"
              >
                固定侧边菜单
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>

    <a-divider />

    <div class="item">
      <h3 class="title">
        其他设置
      </h3>
      <div>
        <a-list :split="false">
          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :default-checked="colorWeak"
              :checked="colorWeak"
              @change="toggleColorWeak"
            />
            <a-list-item-meta>
              <div slot="title">
                色弱模式
              </div>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-switch
              slot="actions"
              size="small"
              :default-checked="multiTab"
              :checked="multiTab"
              @change="toggleMultiTab"
            />
            <a-list-item-meta>
              <div slot="title">
                多页签模式
              </div>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </div>

    <a-divider />

    <div>
      <a-button
        @click="doCopy"
        icon="copy"
        block
      >
        拷贝设置
      </a-button>
      <a-alert
        type="warning"
        :style="{ marginTop: '24px' }"
      >
        <span slot="message">
          配置栏只在开发环境用于预览，生产环境不会展现，请手动修改配置文件
        </span>
      </a-alert>
    </div>

    <div
      class="setting-switch"
      @click="visible = !visible"
    >
      <a-icon
        type="setting"
        v-if="!visible"
      />
      <a-icon
        type="close"
        v-else
      />
    </div>
  </a-drawer>
</template>
<script>
import config from '@/config'
import { mixinApp } from '@/store/modules/app'
import changeColor from './changeColor'

const colorList = [
  {
    key: '薄暮', color: '#F5222D'
  },
  {
    key: '火山', color: '#FA541C'
  },
  {
    key: '日暮', color: '#FAAD14'
  },
  {
    key: '明青', color: '#13C2C2'
  },
  {
    key: '极光绿', color: '#52C41A'
  },
  {
    key: '拂晓蓝（默认）', color: '#1890FF'
  },
  {
    key: '极客蓝', color: '#2F54EB'
  },
  {
    key: '酱紫', color: '#722ED1'
  }
]

function fnLock (fn) {
  let lock = false
  return function (...args) {
    if (lock) {
      return
    }
    lock = true
    return fn.apply(this, args.concat(() => (lock = false)))
  }
}

export default {
  mixins: [mixinApp],
  data () {
    return {
      visible: false,
      colorList,
      handle: <div/>,
      color: '',
    }
  },
  mounted () {
    if (this.primaryColor !== config.primaryColor) {
      this.changePrimaryColor(this.primaryColor)
    }
    if (this.colorWeak !== config.colorWeak) {
      this.toggleColorWeak(this.colorWeak)
    }
  },
  methods: {
    changePrimaryColor: fnLock(function (primaryColor, fnUnlock) {
      if (this.color !== primaryColor) {
        const hideMessage = this.$message.loading('正在切换主题色', 0)
        changeColor(primaryColor)
          .then(() => {
            this.primaryColor = this.color = primaryColor
          })
          .finally(() => {
            hideMessage()
            fnUnlock()
          })
      } else {
        fnUnlock()
      }
    }),
    changeNavTheme (navTheme) {
      this.navTheme = navTheme
    },
    changeLayoutMode (layoutMode) {
      this.layoutMode = layoutMode
      // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
      if (this.layoutMode === 'topmenu') {
        this.toggleFixedSidebar(false)
      }
    },
    changeContentWidth (contentWidth) {
      this.contentWidth = contentWidth
    },
    toggleFixedHeader (flag) {
      this.fixedHeader = flag
    },
    toggleAutoHideHeader (flag) {
      this.autoHideHeader = flag
    },
    toggleFixedSidebar (flag) {
      this.fixedSidebar = flag
    },
    toggleColorWeak (flag) {
      flag ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
      this.colorWeak = flag
    },
    toggleMultiTab (flag) {
      this.multiTab = flag
    },
    doCopy () {
      const text = Object.keys(config)
        .reduce((ret, key) => {
          let val = this[key]
          if (typeof val === 'string') {
            val = `'${val}'`
          }
          return `${ret}${key}:${val},\n`
        }, '')
        .trim()
      this.$copyText(text).then(() => {
        this.$succ('复制完毕')
      }).catch(err => {
        console.log(err)
        this.$err('复制失败')
      })
    },
  }
}
</script>
<style lang="less">
.setting-drawer{
  .item {
    margin-bottom: 24px;
    .block-checkbox {
      display: flex;
      .checkbox-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;
        img {
          width: 48px;
        }
        .select-icon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .theme-color-list {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;
      i {
        font-size: 14px;
      }
    }
  }
  .setting-switch {
    position: absolute;
    top: 240px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;
    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
}
</style>
