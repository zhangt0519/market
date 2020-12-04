<template>
  <keep-alive>
    <router-view :seller="seller"/>
  </keep-alive>
</template>

<script>
export default {
  name: 'HomeContent',
  props: {
    seller: Object
  }
}
</script>

<style lang="stylus" scoped>
</style>
