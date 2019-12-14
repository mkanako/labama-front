<template>
  <div class="menu-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-icon type="user" />&nbsp;
          <span>{{ $store.getters.username }}</span>
        </span>
        <a-menu
          slot="overlay"
          class="user-dropdown-menu-wrapper"
        >
          <a-menu-item @click="formVisible=true">
            <a-icon type="lock" />
            <span>修改密码</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item @click="handleLogout">
            <a-icon type="logout" />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <a-modal
      title="修改密码"
      v-model="formVisible"
      @ok="handleOk"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      width="400px"
      :body-style="{padding:'14px 24px 0'}"
    >
      <a-form
        :form="form"
      >
        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            placeholder="新密码，至少6位"
            v-decorator="[
              'password',
              {
                validateTrigger:'blur',
                rules: [{
                  required: true, message: '必填',
                }, {
                  message: '至少6位密码',
                  min: 6,
                }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            type="password"
            autocomplete="false"
            placeholder="确认密码"
            v-decorator="[
              'password_confirmation',
              {
                validateTrigger:'blur',
                rules: [{
                  required: true, message: '必填',
                }, {
                  validator: compareToFirstPassword,
                }],
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { changePassword, logout } from '@/api/common'

export default {
  name: 'RightMenu',
  data () {
    return {
      form: this.$form.createForm(this),
      formVisible: false,
      confirmLoading: false,
    }
  },
  methods: {
    compareToFirstPassword  (rule, value, callback) {
      if (value && value !== this.form.getFieldValue('password')) {
        callback(Error('两次密码不一致'))
      } else {
        callback()
      }
    },
    handleCancel () {
      this.form.resetFields()
      this.confirmLoading = false
    },
    handleOk () {
      this.form.validateFields({ force: true }, (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          changePassword(values).then(() => {
            this.formVisible = false
            this.form.resetFields()
            this.$notification.success({
              message: '密码修改成功',
              duration: 1,
            })
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '确定要退出登录吗?',
        onOk: () => {
          logout()
        },
      })
    }
  }
}
</script>
