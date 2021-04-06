import Vue from 'vue'
import {
  Alert,
  Avatar,
  BackTop,
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
  Empty,
  FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  message,
  Modal,
  notification,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  Result,
  Row,
  Select,
  Slider,
  Spin,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'ant-design-vue'
import VueClipboard from 'vue-clipboard2'
import moment from 'moment'
import 'moment/locale/zh-cn'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import http from '@/utils/http'
import prompt from '@/components/Prompt'
import loading from '@/components/Loading'
import { sysInfo } from '@/api/common'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/styles/global.less'

moment.locale('zh-cn')

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.component('fa-icon', FontAwesomeIcon)

Vue
  .use(Alert)
  .use(Avatar)
  .use(BackTop)
  .use(Badge)
  .use(Breadcrumb)
  .use(Button)
  .use(Card)
  .use(Checkbox)
  .use(Col)
  .use(ConfigProvider)
  .use(Divider)
  .use(Drawer)
  .use(Dropdown)
  .use(Empty)
  .use(FormModel)
  .use(Icon)
  .use(Input)
  .use(InputNumber)
  .use(Layout)
  .use(List)
  .use(Menu)
  .use(Modal)
  .use(notification)
  .use(PageHeader)
  .use(Pagination)
  .use(Popconfirm)
  .use(Popover)
  .use(Progress)
  .use(Radio)
  .use(Result)
  .use(Row)
  .use(Select)
  .use(Slider)
  .use(Spin)
  .use(Steps)
  .use(Switch)
  .use(Table)
  .use(Tabs)
  .use(Tag)
  .use(Tooltip)

Vue.config.productionTip = false

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$http = http
Vue.prototype.$prompt = prompt
Vue.prototype.$loading = loading
Vue.prototype.$succ = (text = '操作成功') => message.success(text, 1)
Vue.prototype.$err = (text = '错误') => message.error(text)
;['confirm', 'error', 'info', 'success', 'warning'].forEach(method => {
  Vue.prototype[`$${method}`] = function (config) {
    return Modal[method](Object.assign({}, { parentContext: this }, config))
  }
})

new Vue({
  router,
  store,
  mounted () {
    document.title = store.getters.title
    sysInfo()
  },
  render: h => h(App),
}).$mount('#app')
