import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/create/product',
    name: 'CrateProduct',
    component: ()=> import('../views/CreateProduct.vue')
  },
  {
    path: '/buying/detales',
    name: 'buyingDetiles',
    component: ()=> import('../views/BuyingDetales.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: ()=> import('../views/SettingsView.vue')
  },
  {
    path: '/explore',
    name: 'explore',
    component: ()=> import('../views/ExploreView.vue')
  },
  {
    path: '/buying',
    name: 'buying',
    component: ()=> import('../views/BuyingView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('../views/LoginView.vue')
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: ()=> import('../views/ProductView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: ()=> import('../views/CartView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import('../views/Register.view.vue')
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
