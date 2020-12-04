<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="content-titile">
          <span class="titile-brand"></span>
          <span class="titile-name">{{seller.name}}</span>
        </div>
        <div class="content-description">
          {{seller.desc}}
        </div>
        <div class="content-support">
          <span class="support-icon"></span>
          <span class="support-text">{{seller.extra}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    seller: Object
  }
}
</script>

<style lang="stylus" scoped>
  .header
    color: #fff
    background: #666
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .content-titile
          margin: 2px 0 8px 0
          .titile-brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            background-image: url(../imgs/brand@2x.png)
            background-size: 30px 18px
            background-repeat: no-repeat
          .titile-name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .content-description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .content-support
          .support-icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-image: url(../imgs/guarantee_2@2x.png)
            background-size: 12px 12px
            background-repeat: no-repeat
          .support-text
            font-size: 12px
            line-height: 12px
</style>
