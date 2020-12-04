<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight' : totalCount>0}">
            <span class="iconfont icon-shoping-cart" >&#xe615;</span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price">¥{{totalPrice}}</div>
        <div class="desc"></div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="shopcart-list" v-show="!fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listcontentdiv">
        <ul>
          <li class="food border-bottom" v-for="food in selectFoods" :key="food.id">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>¥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cart-control :food="food"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BetterScroll from 'better-scroll'
import CartControl from '../cartcontrol/CartControl'
export default {
  name: 'ShopCart',
  data: function () {
    return {fold: true}
  },
  props: {
    minTotalPrice: Number,
    selectFoods: {
      type: Array,
      default () {
        return [
          {price: 10, count: 1, name: '大饼'},
          {price: 10, count: 0, name: '豆浆'}
        ]
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return this.minTotalPrice + '元起购'
      } else if (Number(this.totalPrice) < this.minTotalPrice) {
        // let diff = this.minTotalPrice - this.totalPrice
        // return '还差起送钱数' + diff
        return this.minTotalPrice + '元起购'
      } else {
        return '提交订单'
      }
    },
    payClass () {
      if (this.totalPrice < this.minTotalPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        this.fold = true
        return
      }
      this.fold = !this.fold
      if (!this.fold) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BetterScroll(this.$refs.listcontentdiv, {
              mouseWheel: false,
              click: true,
              tap: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
        this.fold = true
      })
    },
    pay () {
      if (this.totalPrice < this.minTotalPrice) {
        return
      }
      let phone = window.prompt('请输入手机号', '')
      if (phone) {
      } else if (phone === '') {
        window.alert('请输入手机号')
        return
      } else {
        return
      }
      let newFoodList = []
      this.selectFoods.forEach((food) => {
        let newFood = {'id': food.id, 'name': food.name, 'phone': phone, 'count': food.count}
        newFoodList.push(newFood)
      })
      axios.post('http://wuwangwo886.cn/foodOrderDetail/generateOrder', newFoodList).then(function (ret) {
        window.alert('订单提交成功')
      })
      this.empty()
    }
  },
  components: {
    CartControl
  },
  updated () {
    if (this.scroll) {
      this.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: gray
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #fff
            &.highlight
              background: blue
            .icon-shoping-cart
              line-height: 44px
              font-size: 24px
              color: limegreen
              &.highlight
                background: indianred
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #000
            background: gold
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgb(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: orange
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          color: orange
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2B333b
            color: #fff
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      bottom: 50px
      z-index: -10
      width: 100%
      background: red
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: paleturquoise
        border-bottom: 2px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 15px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: paleturquoise
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 1px
</style>
