import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import otherGames from '@/components/otherGames/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/otherGames',
      component: otherGames
    }
  ]
})
