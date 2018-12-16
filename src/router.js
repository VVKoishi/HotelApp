import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/:hotelId/:hotelName/:stars/:startDate/:endDate',
      name: 'hotel',
      component: () => import(/* webpackChunkName: "about" */ './views/Hotel.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import(/* webpackChunkName: "about" */ './views/Map.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "about" */ './views/Order.vue')
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import(/* webpackChunkName: "about" */ './views/Pay.vue')
    }
  ]
})
