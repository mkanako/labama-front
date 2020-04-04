<template>
  <a-modal
    v-model="dialogVisible"
    width="60%"
    wrap-class-name="uploader-dialog"
    :footer="option.multiple ? undefined : null"
    @ok="handleConfirm"
    centered
  >
    <template v-slot:title>
      <a-upload
        :action="uploadUrl"
        :show-upload-list="false"
        :accept="option.accept"
        @change="handleChange"
        :before-upload="beforeUpload"
        :headers="{Authorization : token}"
      >
        <a-button
          icon="cloud-upload"
          type="primary"
        >
          选择{{ option.text }}上传
        </a-button>
      </a-upload>
    </template>
    <!-- <div
      class="filter-bar"
      v-if="option.type==='image'"
    >
      <a-select
        ref="selectYear"
        @change="selectChange('selectYear')"
        style="width:110px;"
        v-model="filter.year"
        placeholder="请选择"
        size="mini"
        :popper-append-to-body="false"
      >
        <a-option
          :key="0"
          label="不限年份"
          :value="0"
        />
        <a-option
          v-for="year in yearList"
          :key="year"
          :label="year"
          :value="year"
        />
      </a-select>
      <a-select
        ref="selectMonth"
        @change="selectChange('selectMonth')"
        style="width:110px;"
        v-model="filter.month"
        placeholder="请选择"
        size="mini"
        :popper-append-to-body="false"
      >
        <a-option
          :key="0"
          label="不限月份"
          :value="0"
        />
        <a-option
          v-for="month in 12"
          :key="month"
          :label="month"
          :value="month"
        />
      </a-select>
    </div> -->
    <div class="res-list">
      <div
        v-for="(item, index) in resList"
        :key="index"
        @click="handleSelect(item)"
        class="item"
        :class="[selectList[item.id]?'active':'','item-'+option.type]"
        :style="{backgroundImage: getItemBg(item)}"
      >
        <div
          class="item-media-icon"
          v-if="option.type!=='image'"
        >
          <img
            v-if="option.type=='audio'"
            src="./icons/audio.svg"
          >
          <img
            v-if="option.type=='video'"
            src="./icons/video.svg"
          >
        </div>
        <div class="title">
          {{ item.filename }}
        </div>
        <div
          class="remove-btn"
          @click.stop.prevent="handleRemove(item)"
        >
          <a-icon type="delete" />
        </div>
        <div class="mask">
          <a-icon type="check" />
        </div>
      </div>
      <div
        v-if="!resList.length"
        style="text-align: center; padding-bottom: 20px;"
      >
        <img src="./icons/no-data.svg">
        <div>暂无{{ option.text }}</div>
      </div>
    </div>
    <a-pagination
      v-show="resList.length>0"
      v-model="pagination.page"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      size="small"
      @change="handlePageChange"
    />
  </a-modal>
</template>
<script>
import { Upload } from 'ant-design-vue'
import store from '@/store'

export default {
  name: 'Uploader',
  components: {
    [Upload.name]: Upload,
  },
  data () {
    return {
      dialogVisible: false,
      resList: [],
      selectList: {},
      option: {},
      filter: {
        year: 0,
        month: 0,
      },
      callback: null,
      pagination: {
        total: 0,
        page: 1,
        pageSize: 10,
      },
    }
  },
  computed: {
    // yearList () {
    //   let years = []
    //   for (let i = new Date().getFullYear(); i >= 2009; i--) {
    //     years.push(i)
    //   }
    //   return years
    // },
    uploadUrl () {
      return process.env.VUE_APP_API_BASE_URL + '/attachment'
    },
    token () {
      return store.state.account.token
    },
  },
  watch: {
    filter: {
      handler () {
        this.curPage = 1
        this.getResList()
      },
      deep: true,
    },
    dialogVisible (val) {
      if (val) {
        setTimeout(() => {
          this.handleOpen()
        }, 200)
      } else {
        this.handleClose()
      }
    },
  },
  methods: {
    getItemBg (item) {
      return this.option.type === 'image' ? ('url(' + item.url + ')') : 'none'
    },
    beforeUpload () {
      this.$loading.open()
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        this.$loading.close()
      }
      if (info.file.xhr) {
        const token = info.file.xhr.getResponseHeader('Authorization')
        if (token) {
          store.commit('SET_TOKEN', token)
        }
      }
      if (info.file.status === 'done') {
        if (info.file.response.code === 0) {
          this.$succ('上传成功')
          this.pagination.page = 1
          this.getResList()
        } else {
          this.$err(info.file.response.msg)
        }
      } else if (info.file.status === 'error') {
        this.$err(`${info.file.name} file upload failed.`)
      }
    },
    handleOpen () {
      if (!this.resList.length) {
        this.getResList()
      }
    },
    handleClose () {
      this.selectList = {}
      this.callback = null
    },
    handlePageChange () {
      this.$nextTick(() => {
        this.getResList()
      })
    },
    handleRemove (item) {
      this.$confirm({
        title: '提示',
        content: '删除后不可恢复，确认删除吗？',
        okType: 'danger',
        centered: true,
        onOk: (close) => {
          this.$http.delete(`attachment/${item.id}`)
            .then(resp => {
              this.$succ('删除成功')
              if (this.selectList[item.id]) {
                this.$delete(this.selectList, item.id)
              }
              if (this.resList.length <= 1) {
                this.pagination.page = Math.max(1, this.pagination.page - 1)
              }
              this.getResList()
            })
            .finally(() => close())
        },
      })
    },
    handleSelect (item) {
      if (this.selectList[item.id]) {
        this.$delete(this.selectList, item.id)
      } else {
        if (!this.option.multiple) {
          this.selectList = {}
        }
        this.$set(this.selectList, item.id, item)
        if (!this.option.multiple) {
          this.handleConfirm()
        }
      }
    },
    handleConfirm () {
      if (Object.keys(this.selectList).length) {
        const ret = []
        for (const key in this.selectList) {
          ret.push(this.selectList[key].path)
        }
        this.callback(this.option.multiple ? ret.reverse() : ret[0])
        this.dialogVisible = false
      }
    },
    getResList () {
      this.$http.get('attachment', {
        params: {
          page: this.pagination.page,
          type: this.option.type,
        },
      }).then(resp => {
        if (resp.data) {
          this.resList = resp.data
          this.pagination.total = parseInt(resp.total)
          this.pagination.page = parseInt(resp.page)
          this.pagination.pageSize = parseInt(resp.pageSize)
        }
      })
    },
    open (callback, option) {
      switch (option.type) {
        case 'image':
          Object.assign(option, {
            text: '图片',
            accept: 'image/*',
          })
          break
        case 'audio':
          Object.assign(option, {
            text: '音频',
            accept: 'audio/amr,audio/mp3,audio/wma,audio/wmv,audio/amr,audio/wav',
          })
          break
        case 'video':
          Object.assign(option, {
            text: '视频',
            accept: 'video/rm, video/rmvb, video/wmv, video/avi, video/mpg, video/mpeg, video/mp4',
          })
          break
      }
      this.option = option
      this.callback = callback
      this.dialogVisible = true
    },
  },
}
</script>
<style lang="less">
.uploader-dialog {
  .ant-modal-header {
    border: none;
    padding-bottom: 10px;
  }

  .ant-modal-footer {
    border: none;
    padding-bottom: 20px;
    padding-top: 0;
  }

  .ant-modal-body {
    padding: 0 16px 16px 16px;
  }

  .ant-pagination {
    margin-top: 10px;
    text-align: right;
  }
  // .filter-bar{
  //   margin-bottom: 10px;
  //   padding-right: 5px;
  //   .a-select{
  //     margin: 0 5px;
  //   }
  // }
  .res-list {
    .item-image {
      background-color: #eee;
      background-size: contain;
      background-position: 50% 50%;
    }

    .item-media-icon {
      position: absolute;
      top: 0;
      left: 0;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      width: 100%;
      height: calc(80% + 2px);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 50%;

      img {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        width: 50%;
        height: 50%;
      }
    }

    .item {
      cursor: pointer;
      display: inline-block;
      position: relative;
      width: calc(20% - 20px);
      margin: 10px;
      text-align: center;
      vertical-align: middle;
      background-repeat: no-repeat;

      &.active {
        .mask {
          display: block;
        }
      }

      &:hover {
        outline: 2px solid #1890ff;

        .remove-btn {
          display: block;
        }
      }

      &::before {
        content: "";
        display: inline-block;
        padding-bottom: 100%;
        width: 0.1px;
        vertical-align: middle;
      }

      .remove-btn {
        position: absolute;
        width: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #1890ff;
        bottom: 0;
        right: 0;
        z-index: 6;
        display: none;
        color: #fff;
      }

      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 12px;
        line-height: 24px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 0 5px;
        text-align: left;
        z-index: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 5;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        display: none;

        i {
          color: #fff;
          font-size: 32px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
