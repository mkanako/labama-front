<template>
  <div class="login-container">
    <div class="text-center mb-40">
      <div class="h-40 leading-40">
        <img
          src="@/assets/logo.svg"
          class="h-full mr-16 align-top"
        >
        <span class="text-32 text-black font-semibold">{{ $store.getters.title }}</span>
      </div>
      <div class="mt-12 text-grey-6">
        &nbsp;
      </div>
    </div>
    <div class="my-0 mx-auto md:w-1/3 w-5/6">
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="帐户:"
            allow-clear
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change' }
            ]"
          >
            <a-icon
              slot="prefix"
              type="user"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码:"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
            ]"
          >
            <a-icon
              slot="prefix"
              type="lock"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            block
            :loading="logining"
            :disabled="logining"
          >
            确定
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <LayoutFooter />
  </div>
</template>
<script>
import LayoutFooter from '@/layout/LayoutFooter'
import { login } from '@/api/common'

export default {
  name: 'Login',
  components: {
    LayoutFooter,
  },
  data () {
    return {
      form: this.$form.createForm(this),
      logining: false,
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.logining = true
      this.form.validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          login(values).then(() => {
            this.$store.commit('SET_NAME', values.username)
            setTimeout(() => {
              this.$succ('登录成功')
              this.$router.replace({ path: '/' })
            }, 500)
          }).catch(() => {
            setTimeout(() => {
              this.logining = false
            }, 500)
          })
        } else {
          setTimeout(() => {
            this.logining = false
          }, 200)
        }
      })
    },
  }
}
</script>
<style lang="less">
.login-container {
  height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
  padding-top: 110px;
}
</style>
