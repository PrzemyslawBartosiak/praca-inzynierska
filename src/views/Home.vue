<template>
  <div class="home">
    <div>
      <article v-for="(dish, idx) in dishes" :key="idx">
        <h1>{{ dish.nazwa }}</h1>
        <v-img
          max-height="700"
          max-width="500"
          :src="require('@/assets/' + dish.adres_zdjecia)"
          alt=""
        ></v-img>
      </article>
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase/app'

export default {
  name: 'Home',
  data: () => ({
    isLoading: false,
    dishes: [],
    currentDish: {},
    currentIndex: 0
  }),
  created() {
    this.$store.dispatch('user/bindMatchesRef')
    this.fetchDishes(this.userDishesDbPage)
  },
  methods: {
    async fetchDishes(userPage) {
      db.collection('dania')
        .where('page', '==', userPage)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            this.dishes.push(doc.data())
          })
        })
    },
    async incrementCurrentIndex() {
      if (this.currentIndex === this.dishesResultsLength - 1) {
        const newPage = this.userDishesDbPage + 1
        await db
          .collection('users')
          .doc(this.authUserId)
          .update({ dishesDbPage: newPage })

        this.$store.dispatch('user/setDishesDbPage', newPage)
        this.fetchDishes(newPage)
        this.currentIndex = 0
      } else {
        this.currentIndex++
        this.currentDish = this.dishes[this.currentIndex]
      }
    },

    async thumbsUp() {
      let userRef = db.collection('user').doc(this.authUserId)
      let partnerRef = db.collection('user').doc(this.partnerId)

      await userRef.collection('likedDishes').add({ ...this.currentDish })

      if (this.partnerId) {
        const partnerLikedSnapshot = await partnerRef
          .collection('likedDishes')
          .where('id', '==', this.currentDish.id)
          .get()

        if (!partnerLikedSnapshot.empty) {
          await userRef.collection('matches').add({ ...this.currentDish })
          await partnerRef.collection('matches').add({ ...this.currentDish })
        }
      }

      this.incrementCurrentIndex()
    },
    async thumbsDown() {
      await this.incrementCurrentIndex()
    }
  },

  computed: {
    dishesResultsLength() {
      return this.dishes.length
    },
    userDishesDbPage() {
      return this.$store.state.user.dishesDbPage
    },
    authUserId() {
      return this.$store.state.user.id
    },
    partnerId() {
      return this.$store.state.user.partnerId
    }
  }
}
</script>
