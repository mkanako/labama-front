<template functional>
  <a-layout-footer class="app-footer">
    <div class="links">
      <!-- <a href="https://ant.design/">Ant Design</a>
      <a href="https://vue.ant.design/">Vue Antd</a> -->
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> {{ (new Date()).getFullYear() }}
    </div>
  </a-layout-footer>
</template>
<script>
export default {
  name: 'GlobalFooter',
}
</script>
<style lang="less">
.app-footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  .links a{
    color: rgba(0, 0, 0, 0.45);
    &:hover {
      color: rgba(0, 0, 0, 0.65);
    }
    &:not(:last-child) {
      margin-right: 40px;
    }
  }
  .copyright {
    margin-top: 8px;
  }
}
</style>
