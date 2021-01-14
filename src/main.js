import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: 'AIzaSyCjUG06ndYt8BEDoOmsbL8NCUJkXFV2B-c',
  authDomain: 'praca-inzynierska-45ab0.firebaseapp.com',
  projectId: 'praca-inzynierska-45ab0',
  storageBucket: 'praca-inzynierska-45ab0.appspot.com',
  messagingSenderId: '192376754363',
  appId: '1:192376754363:web:250e1f079ca6ae5bcdd99e',
  measurementId: 'G-T955M81R6S'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
