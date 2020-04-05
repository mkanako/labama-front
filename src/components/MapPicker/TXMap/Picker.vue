<template>
  <a-modal
    title="请选择地图位置"
    v-model="modalVisible"
    width="80%"
    :body-style="{padding:0,height:'70vh',borderBottom: '1px solid #e8e8e8'}"
    @ok="handleOk"
    centered
  >
    <iframe
      style="width: 100%; height: 100%;"
      :src="url"
      frameborder="0"
    />
  </a-modal>
</template>
<script>
import { name } from '@root/package.json'

const KEY = 'IEEBZ-RCYWJ-UXDFO-KGHE6-LONLH-JEFXN'

export default {
  name: 'TXMapPicker',
  data () {
    return {
      modalVisible: false,
      result: {},
      callback: null,
      url: `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${KEY}&referer=${name}`,
    }
  },
  mounted () {
    window.addEventListener('message', this.messageListener, false)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.messageListener)
  },
  methods: {
    handleOk () {
      if (this.callback && Object.keys(this.result).length > 0) {
        this.callback(Object.assign({}, this.result))
      }
      this.modalVisible = false
    },
    messageListener ({ data }) {
      if (data && data.module === 'locationPicker') {
        this.result = {
          lat: data.latlng.lat,
          lng: data.latlng.lng,
          address: data.poiaddress,
          city: data.cityname,
          name: data.poiname,
        }
      }
    },
    open (cb, val) {
      if (val && val.lat && val.lng) {
        // eslint-disable-next-line eqeqeq
        if (val.lat != this.result.lat || val.lng != this.result.lng) {
          this.url = this.url.replace(/&coord=.*$/, '') + `&coord=${val.lat},${val.lng}`
        }
      }
      this.callback = cb
      this.modalVisible = true
    },
  },
}
</script>
