<template>
  <div
    :class="['login-wrapper', device]"
  >
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="javascript:;">
            <img
              src="~@/assets/logo.svg"
              class="logo"
              alt="logo"
            >
            <span class="title">{{ title }}</span>
          </a>
        </div>
        <div class="desc">
          &nbsp;
        </div>
      </div>
      <div class="main">
        <a-form
          class="user-layout-login"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账号:"
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
            <a-input
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
            </a-input>
          </a-form-item>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              html-type="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </div>
      <global-footer />
    </div>
  </div>
</template>
<script>
import { mixinDevice } from '@/utils/mixin'
import { mapGetters, mapActions } from 'vuex'
import GlobalFooter from '@/layouts/components/GlobalFooter'

export default {
  name: 'Login',
  mixins: [mixinDevice],
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
  computed: {
    ...mapGetters([
      'title',
    ]),
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.logining = true
      validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          Login(values).finally(() => {
            state.logining = false
          })
        } else {
          setTimeout(() => {
            state.logining = false
          }, 600)
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .login-wrapper {
    height: 100%;
    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }
    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;
      a {
        text-decoration: none;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }
          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
        form {
          label {
            font-size: 14px;
          }
          button.login-button {
            padding: 0 15px;
            font-size: 16px;
            height: 40px;
            width: 100%;
          }
        }
      }
      /deep/ .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
      }
    }
  }
</style>
