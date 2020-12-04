<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuDiv">
      <ul>
        <li class="menu-item border-bottom" v-for="(item, key, index) in goods" :key="key" :class="{'current':currentIndex===index}" @click="menuClick(key)">
          <span class="text">
            {{key}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsDiv">
      <ul>
        <li class="food-list food-list-hook" v-for="(list, key) in goods" :key="key" :ref="key">
          <h1 class="titile">{{key}}</h1>
          <ul>
            <li class="food-item border-bottom" v-for="(item, index) of list" :key="index">
              <div @click="selectFood(item)" class="icon">
                <img v-if="!item.foodImgs" width="70" height="70" src="http://wuwangwo886.cn/market/static/imgs/gouwuche.jpg">
                <img v-if="item.foodImgs" width="70" height="70" :src="item.foodImgs[0].imgUrl">
              </div>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.remark}}</p>
                <div class="extra">
                  <span class="count">月度靓款</span>
                </div>
                <div class="price">
                  <span class="now">¥{{item.price}}</span>
                  <span class="old" v-if="item.oldPrice">¥{{item.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="item"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcart :selectFoods="selectFoods" :minTotalPrice="seller.minTotalPrice" ref="shopcart"></Shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import axios from 'axios'
import BetterScroll from 'better-scroll'
import Shopcart from '../../shopcart/Shopcart'
import CartControl from '../../cartcontrol/CartControl'
import Food from '../../food/Food'
export default {
  name: 'Goods',
  data () {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      for (let key in this.goods) {
        for (let food of this.goods[key]) {
          if (food.count > 0) {
            foods.push(food)
          }
        }
      }
      return foods
    }
  },
  props: {
    seller: Object
  },
  methods: {
    menuClick (foodtype) {
      // this.foodtype = foodtype
      const element = this.$refs[foodtype][0]
      this.goodsScroll.scrollToElement(element)
    },
    selectFood (food) {
      this.selectedFood = food
      this.$refs.food.show()
    },
    getGoodsInfo () {
      axios.get('http://wuwangwo886.cn/food/getAllFoodByFoodType')
        .then(this.getGoodsInfoSucc)
    },
    getGoodsInfoSucc (res) {
      res = res.data
      this.goods = res
      this.$nextTick(() => {
        this.menuScroll = new BetterScroll(this.$refs.menuDiv, {
          mouseWheel: true,
          click: true,
          tap: true
        })
        this.goodsScroll = new BetterScroll(this.$refs.foodsDiv, {
          mouseWheel: true,
          click: true,
          tap: true,
          probeType: 3
        })
        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
        this.calHeight()
      })
    },
    calHeight () {
      let foodList = this.$refs.foodsDiv.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  mounted () {
    this.getGoodsInfo()
  },
  components: {
    Shopcart,
    CartControl,
    Food
  }
}
</script>

<style lang="stylus" scoped>
  .border-bottom
    &:before
      border-color: green
  .goods
    display: flex
    position: absolute
    top: 146px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        padding: 0 12px
        height: 54px
        width: 56px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: palegreen
          font-weight: 700
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
    .foods-wrapper
      flex: 1
      .titile
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            &.count
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
            right: 0
            bottom: 12px
</style>
