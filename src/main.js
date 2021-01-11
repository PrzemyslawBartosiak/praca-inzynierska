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

// let dania = [
//   {
//     "id": 1,
//     "kategoria": "Burgery",

//     "nazwa": "Burger Amerykański",
//     "restaurcja": "American Style",
//     "sklad": {
//         "Rodzaj mięsa": "Wołowina",
//         "Dodatki": {
//             "1": "Ser",
//             "2": "Rukola",
//             "3": "Boczek",
//             "4": "Pikle",
//             "5": "Czerwona cebula",
//             "6": "Pomidor"
//           },
//         "Sosy": {
//             "1": "Majonez",
//             "2": "Sos BBQ",
//             "3": "Ketchup"

//           }
//       },
//     "cena": "24,99zł",
//     "likes": "25",
//     "dislikes": "2",
//     "comments": ['Najlepszy burger jaki w życiu jadłem!']
//   },
//   {
//     "id": 2,
//     "kategoria": "Burgery",

//     "nazwa": "Burger Alabama",
//     "restaurcja": "American Style",
//     "sklad": {
//         "Rodzaj miesa": "Wołowina",
//         "Dodatki": {
//             "1": "Ser",
//             "2": "Rukola",
//             "3": "Boczek",
//             "4": "Pikle",
//             "5": "Czerwona cebula",
//             "6": "Pomidor"
//           },
//         "Sosy": {
//             "1": "Majonez",
//             "2": "Sos BBQ",
//             "3": "Ketchup"

//           }
//       },
//     "cena": "24,99zł",
//     "likes": "25",
//     "dislikes": "2",
//     "comments": ['Nie jest to najlepszy burger dostępny w tej knajpie, ale całkiem dobry jak na swoją cenę']
//   },
//   {
//     "id": 3,
//     "kategoria": "Burgery",

//     "nazwa": "Burger Texas",
//     "restaurcja": "American Style",
//     "sklad": {
//         "Rodzaj miesa": "Wołowina",
//         "Dodatki": {
//             "1": "Ser",
//             "2": "Rukola",
//             "3": "Boczek",
//             "4": "Pikle",
//             "5": "Czerwona cebula",
//             "6": "Pomidor"
//           },
//         "Sosy": {
//             "1": "Majonez",
//             "2": "Sos BBQ pikantny",
//             "3": "Ketchup"

//           }
//       },
//     "cena": "24,99zł",
//     "likes": "25",
//     "dislikes": "2",
//     "comments": ['Bardzo dobry burger, polecam dla osób lubiących ostre jedzenie.']
//   }
// ]

// dania.forEach(function(obj) {
//   db.collection("dania").add({
//       id: obj.id,
//       kategoria: obj.kategoria,
//       nazwa: obj.nazwa,
//       restaurcja: obj.restaurcja,
//       sklad: obj.sklad,
//       cene: obj.cena,
//       likes: obj.likes,
//       dislikes: obj.dislikes,
//       comments: obj.comments
//   }).then(function(docRef) {
//       console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function(error) {
//       console.error("Error adding document: ", error);
//   });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
