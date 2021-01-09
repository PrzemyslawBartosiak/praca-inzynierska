import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import wyszukiwarka from '../views/wyszukiwarka.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wyszukiwarka',
    name: 'wyszukiwarka',
    component: wyszukiwarka,
    beforeEnter: guard
  },
  {
    path: '/rejestracja',
    name: 'rejestracja',

    component: () =>
      import(/* webpackChunkName: "sign-up" */ '../views/rejestracja.vue')
  },
  {
    path: '/logowanie',
    name: 'logowanie',

    component: () =>
      import(/* webpackChunkName: "sign-in" */ '../views/logowanie.vue')
  },
  {
    path: '/dodawanie-partnera',
    name: 'dodawaniePartnera',
    beforeEnter: guard,
    component: () =>
      import(
        /* webpackChunkName: "dodawanie-partnera" */ '../views/dodawaniePartnera.vue'
      )
  }
]

function guard(to, from, next) {
  if (store.state.user.id) {
    next()
  } else {
    next('/')
  }
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
