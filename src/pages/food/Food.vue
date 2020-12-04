<template>
  <transition
  enter-active-class="animated bounceIn"
  leave-active-class="animated bounceOut"
  >
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img v-if="!food.foodImgs" src="http://wuwangwo886.cn/market/static/imgs/gouwuche.jpg">
          <img v-if="food.foodImgs" :src="food.foodImgs[0].imgUrl">
          <div class="back" @click="hide">
            <span class="iconfont backspan" >&#xe656;</span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">{{food.remark}}</span>
            <span class="rating">好评率100%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontrol-wrapper" v-show="food.count>0">
          <cart-control :food="food"></cart-control>
        </div>
        <div @click="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import CartControl from '../cartcontrol/CartControl'
export default {
  name: 'Food',
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    addFirst () {
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" scoped>
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: greenyellow
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        background: red
        .backspan
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 36px
      z-index: 10
      height: 24px
      line-height: 24px
      padding: 0 12px
      box-sizing: border-box
      border-radius: 12px
      font-size: 10px
      color: #fff
      background: rgb(0, 160, 220)
</style>
