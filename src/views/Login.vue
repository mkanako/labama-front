<template>
  <div class="login-container">
    <div class="text-center mb-40">
      <div class="h-40 leading-none">
        <img
          src="@/assets/logo.svg"
          class="h-full mr-16"
        >
        <span class="text-32 text-black font-semibold  align-middle">{{ $store.getters.title }}</span>
      </div>
      <div class="mt-12 text-grey-6">
        &nbsp;
      </div>
    </div>
    <div class="my-0 mx-auto md:w-1/3 w-5/6">
      <a-form-model
        :model="form"
        :rules="rules"
        ref="form"
      >
        <a-form-model-item prop="username">
          <a-input
            v-model="form.username"
            size="large"
            type="text"
            placeholder="帐户:"
            allow-clear
          >
            <a-icon
              slot="prefix"
              type="user"
            />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input-password
            v-model="form.password"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码:"
          >
            <a-icon
              slot="prefix"
              type="lock"
            />
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            size="large"
            type="primary"
            block
            :loading="logining"
            @click="handleSubmit"
          >
            确定
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <LayoutFooter />
  </div>
</template>
<script>
import LayoutFooter from '@/layout/LayoutFooter'
import { login } from '@/api/common'
import { genFormProps } from '@/utils'

export default {
  name: 'Login',
  components: {
    LayoutFooter,
  },
  data () {
    const fields = {
      username: {
        value: this.$store.getters.username,
        rule: {
          required: true,
          message: '请输入帐户名',
        },
      },
      password: {
        value: '',
        rule: {
          required: true,
          message: '请输入密码',
        },
      },
    }
    const { models: form, rules } = genFormProps(fields)
    return {
      form,
      rules,
      logining: false,
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.$refs.form.validate(valid => {
        if (valid) {
          this.logining = true
          login(this.form).then(() => {
            this.$succ('登录成功')
          }).finally(() => {
            setTimeout(() => {
              this.logining = false
            }, 500)
          })
        }
      })
    },
  },
}
</script>
<style lang="less">
.login-container {
  height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
  padding-top: 110px;

  .ant-input-prefix .anticon {
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
