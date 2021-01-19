import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import wyszukiwarka from '../views/wyszukiwarka.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'stronaGlowna',
    component: () =>
      import(/* webpackChunkName: "stronaGlowna" */ '../views/stronaGlowna.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/Profil.vue'),
    beforeEnter: guard
  },

  {
    path: '/aktualizacjaDanych',
    name: 'aktualizacjaDanych',
    component: () =>
      import(
        /* webpackChunkName: "aktualizacjaDanych" */ '../views/aktualizacjaDanych.vue'
      )
  },

  {
    path: '/wyszukiwarka',
    name: 'wyszukiwarka',
    component: () =>
      import(
        /* webpackChunkName: "wyszukiwarka" */ '../views/wyszukiwarka.vue'
      ),
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
  },
  {
    path: '/dopasowania',
    name: 'dopasowania',
    beforeEnter: guard,
    component: () =>
      import(/* webpackChunkName: "dopasowania" */ '../views/dopasowania.vue')
  },
  {
    path: '/ulubione',
    name: 'ulubione',
    beforeEnter: guard,
    component: () =>
      import(/* webpackChunkName: "ulubione" */ '../views/ulubione.vue')
  },
  {
    path: '/rezerwacjaDania',
    name: 'rezerwacjaDania',
    beforeEnter: guard,
    component: () =>
      import(
        /* webpackChunkName: "rezerwacjaDania" */ '../views/rezerwacjaDania.vue'
      )
  },
  {
    path: '/rezerwacjaDaniaPotwierdzenie',
    name: 'rezerwacjaDaniaPotwierdzenie',
    beforeEnter: guard,
    component: () =>
      import(
        /* webpackChunkName: "rezerwacjaDaniaPotwierdzenie" */ '../views/rezerwacjaDaniaPotwierdzenie.vue'
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
