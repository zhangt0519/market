import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Goods from '@/pages/home/components/Goods'
import Seller from '@/pages/home/components/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: 'goods', component: Goods },
        { path: 'seller', component: Seller },
        { path: '*', redirect: 'goods' } /* 默认跳转路由 */
      ]
    }
  ]
})
