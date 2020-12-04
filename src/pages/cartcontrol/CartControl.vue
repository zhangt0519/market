<template>
  <div class="cartcontrol">
    <transition
    enter-active-class="animated fadeInRightBig"
    leave-active-class="animated fadeOutRight"
    >
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="iconfont" >&#xe618;</span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add" v-if="show" @click="addCart">
      <span class="iconfont" >&#xe660;</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CartControl',
  data () {
    return {
      show: true
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cartAdd', event.target)
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size: 0
    vertical-align: center
    .cart-decrease
      display: inline-block
      padding: 6px
    .cart-count
      display: inline-block
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 36px
      font-size: 36px
      color: rgb(0, 160, 220)
</style>
