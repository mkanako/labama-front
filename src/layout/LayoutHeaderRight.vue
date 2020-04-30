<template>
  <div>
    <a-dropdown
      placement="bottomRight"
      @visibleChange="dropdownChange"
    >
      <span class="cursor-pointer inline-block">
        <a-icon type="user" />
        <span
          v-show="$store.getters.username"
          class="ml-8"
        >
          {{ $store.getters.username }}
          <a-icon
            class="text-10"
            type="down"
            :rotate="dropdownVisible ? 180 : 0"
          />
        </span>
      </span>
      <a-menu slot="overlay">
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
    <a-modal
      title="修改密码"
      v-model="formVisible"
      @ok="handleOk"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      width="400px"
      :body-style="{padding:'14px 24px 0'}"
    >
      <a-form-model
        :model="models"
        :rules="rules"
        ref="form"
      >
        <a-form-model-item prop="password">
          <a-input-password
            v-model="form.password"
            autocomplete="false"
            placeholder="新密码，至少6位"
          />
        </a-form-model-item>
        <a-form-model-item prop="password_confirmation">
          <a-input-password
            v-model="form.password_confirmation"
            autocomplete="false"
            placeholder="确认密码"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { changePassword, logout } from '@/api/common'
import generateFormProps from '@/utils/generateFormProps'

export default {
  name: 'LayoutHeaderRight',
  data () {
    const fields = {
      password: {
        rule: [
          { required: true },
          { min: 6, message: '至少6位密码' },
        ],
      },
      password_confirmation: {
        rule: [
          { required: true },
          {
            validator: (rule, value, callback) => {
              if (value && value !== this.models.password) {
                callback(Error('两次密码不一致'))
              } else {
                callback()
              }
            },
          },
        ],
      },
    }
    const { models, rules } = generateFormProps(fields)
    return {
      models,
      rules,
      formVisible: false,
      confirmLoading: false,
      dropdownVisible: false,
    }
  },
  methods: {
    dropdownChange (visible) {
      this.dropdownVisible = visible
    },
    handleCancel () {
      this.$refs.form.resetFields()
      this.confirmLoading = false
    },
    handleOk () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.confirmLoading = true
          changePassword(this.models).then(() => {
            this.formVisible = false
            this.$refs.form.resetFields()
            setTimeout(() => {
              this.$succ('密码修改成功')
            }, 300)
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
        onOk: () => logout(),
      })
    },
  },
}
</script>
<style scoped>
.anticon-down /deep/ svg {
  transition: all 0.2s;
}
</style>
