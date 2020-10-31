<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="text-center mb-40">
        <div class="h-40 leading-none">
          <img
            src="@/assets/logo.svg"
            class="h-full mr-16"
          >
          <span class="text-32 text-black font-semibold align-middle">{{ $store.getters.title }}</span>
        </div>
        <div class="text-grey-6">
          &nbsp;
        </div>
      </div>
      <a-form-model
        :model="models"
        :rules="rules"
        ref="form"
      >
        <a-form-model-item prop="username">
          <a-input
            v-model="models.username"
            size="large"
            type="text"
            placeholder="帐户:"
            allow-clear
            name="username"
          >
            <template v-slot:prefix>
              <a-icon type="user" />
            </template>
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input-password
            v-model="models.password"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码:"
          >
            <template v-slot:prefix>
              <a-icon type="lock" />
            </template>
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            html-type="submit"
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
    <LayoutFooter class="bg-transparent" />
  </div>
</template>
<script>
import LayoutFooter from '@/layout/LayoutFooter'
import { login } from '@/api/common'
import generateFormProps from '@/utils/generateFormProps'

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
        rule: {
          required: true,
          message: '请输入密码',
        },
      },
    }
    const { models, rules } = generateFormProps(fields)
    return {
      models,
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
          login(this.models).then(() => {
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
.login-wrapper {
  background: url(~@/assets/background.svg) no-repeat;
  background-position: center;
  background-size: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;

  .login-container {
    align-self: center;
    justify-self: center;
    min-width: 300px;
    max-width: 500px;

    @apply w-5/6;

    @media (min-width: theme('screens.sm')) {
      @apply w-1/2;
    }

    @media (min-width: theme('screens.lg')) {
      @apply w-1/3;
    }
  }
}
</style>
