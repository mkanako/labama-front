import Vue from 'vue'
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  LocaleProvider,
  Menu,
  message,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Row,
  Select,
  Spin,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'ant-design-vue'
import VueClipboard from 'vue-clipboard2'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import http from '@/utils/http'
import prompt from '@/components/Prompt'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { sysInfo } from '@/api/common'
import { AppDeviceEnquire, DEVICE_TYPE } from '@/utils/device'

moment.locale('zh-cn')
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.use(Alert)
Vue.use(Avatar)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(ConfigProvider)
Vue.use(Divider)
Vue.use(Drawer)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(List)
Vue.use(LocaleProvider)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(notification)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Select)
Vue.use(Spin)
Vue.use(Steps)
Vue.use(Switch)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Tooltip)

Vue.config.productionTip = false

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$http = http
Vue.prototype.$prompt = prompt
Vue.prototype.$succ = (text = '操作成功') => message.success(text, 1)
Vue.prototype.$err = (text = '错误') => message.error(text)

new Vue({
  router,
  store,
  mounted () {
    document.title = store.getters.title
    sysInfo()
    AppDeviceEnquire(type => {
      store.commit('SET_DEVICE', type)
      if (type === DEVICE_TYPE.MOBILE) {
        store.commit('CLOSE_SIDEBAR')
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
