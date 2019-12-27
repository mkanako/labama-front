<template>
  <div :class="['login-container', device]">
    <div class="top">
      <div class="header">
        <img
          src="@/assets/logo.svg"
          class="logo"
        >
        <span class="title">{{ $store.getters.title }}</span>
      </div>
      <div class="desc">
        &nbsp;
      </div>
    </div>
    <div class="main">
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="账号:"
            allow-clear
            v-decorator="[
              'username',
              {rules: [{ required: true, message: '请输入帐户名' }], validateTrigger: 'change'}
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
              {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
            ]"
          >
            <a-icon
              slot="prefix"
              type="lock"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input-password>
        </a-form-item>
        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            block
            :loading="state.logining"
            :disabled="state.logining"
          >
            确定
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <global-footer />
  </div>
</template>
<script>
import { mixinApp } from '@/store/modules/app'
import GlobalFooter from '@/layouts/components/GlobalFooter'
import { login } from '@/api/common'

export default {
  name: 'Login',
  mixins: [mixinApp],
  components: {
    GlobalFooter,
  },
  data () {
    return {
      form: this.$form.createForm(this),
      state: {
        logining: false,
      }
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
      } = this
      state.logining = true
      validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          login(values).then(() => {
            this.$store.commit('SET_NAME', values.username)
            this.$succ('登录成功')
            setTimeout(() => {
              this.$router.replace({ path: '/' })
            }, 500)
          })
        } else {
          setTimeout(() => {
            state.logining = false
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
  .top {
    text-align: center;
    margin-bottom: 40px;
    .header {
      height: 44px;
      line-height: 44px;
      .logo {
        height: 100%;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 32px;
        color: rgba(0, 0, 0, .85);
        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
      }
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      margin-top: 12px;
    }
  }
  .main {
    width: 368px;
    margin: 0 auto;
  }
  &.mobile {
    .main {
      width: 90%;
    }
  }
}
</style>
