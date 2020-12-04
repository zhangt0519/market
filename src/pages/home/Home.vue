<template>
  <div>
    <home-header :seller="seller"></home-header>
    <home-tab></home-tab>
    <home-content :seller="seller"></home-content>
  </div>
</template>
<script>
import axios from 'axios'
import HomeHeader from './components/Header'
import HomeTab from './components/Tab'
import HomeContent from './components/Content'
export default {
  name: 'Home',
  data () {
    return {
      seller: {},
      goods: {}
    }
  },
  components: {
    HomeHeader,
    HomeTab,
    HomeContent
  },
  methods: {
    getSellerInfo () {
      axios.get('http://wuwangwo886.cn/market/static/mock/seller.json')
        .then(this.getSellerInfoSucc)
    },
    getSellerInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.seller = data.seller
        this.$nextTick(() => {
          console.log('logolog===================')
        })
      }
    }
  },
  mounted () {
    this.getSellerInfo()
  }
}
</script>

<style>
</style>
