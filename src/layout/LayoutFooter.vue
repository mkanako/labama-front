<template functional>
  <a-layout-footer>
    <div>
      <a
        target="_blank"
        href="https://ant.design/"
      >Ant Design</a>
      <a
        target="_blank"
        href="https://www.antdv.com/docs/vue/introduce-cn/"
      >Vue Antd</a>
    </div>
    <div class="mt-8">
      Copyright
      <a-icon type="copyright" /> {{ (new Date()).getFullYear() }}
    </div>
  </a-layout-footer>
</template>
<script>
export default {
  name: 'LayoutFooter',
}
</script>
