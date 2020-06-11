<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function () {
    // 页面开始加载时修改font-size
    var html = document.getElementsByTagName('html')[0]
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth
    // 这里的750是指设计图的大小,自己根据实际情况改变
    html.style.fontSize = oWidth / 750 * 100 + 'px'
    console.log('rem:', html.style.fontSize)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
