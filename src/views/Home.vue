<template>
  <div class="home">
    <div>
      <!-- <article v-for="(dish, idx) in dishes" :key="idx">
        <h1>{{ dish.nazwa }}</h1>
        <v-img
          max-height="700"
          max-width="500"
          :src="require('@/assets/' + dish.adres_zdjecia)"
          alt=""
        ></v-img>
      </article> -->
      <v-card :loading="isLoading" class="mx-auto my-12" max-width="600">
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-row>
          <v-col md="6"><v-img :src="dishImage.photo"></v-img></v-col>
          <v-col md="6" class="mt-5">
            <v-card-title>{{ currentDish.nazwa }}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <div>{{ currentDish.cena }}</div>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row class="d-flex justify-space-around">
                <v-btn color="green" @click="thumbsUp">
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <v-btn color="red" @click="thumbsDown">
                  <v-icon>mdi-thumb-down</v-icon>
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
      <!-- <swipeable-cards /> -->
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase/app'
// import SwipeableCards from '../components/SwipeableCards.vue'

export default {
  name: 'Home',
  // components: { SwipeableCards },
  data: () => ({
    isLoading: false,
    dishes: [],
    currentDish: {},
    currentIndex: 0
  }),
  created() {
    // this.$store.dispatch('user/bindMatchesRef')
    this.fetchDishes()
  },
  methods: {
    async fetchDishes() {
      const res = await db
        .collection('dania')

        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            this.dishes.push(doc.data())
          })
        })

      this.currentDish = this.dishes[0]
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
      let userRef = db.collection('users').doc(this.authUserId)

      await userRef.collection('likedDishes').add({ ...this.currentDish })

      if (this.partnerId) {
        let partnerRef = db.collection('users').doc(this.partnerId)
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
    },
    dishImage() {
      return {
        ...this.currentDish,
        photo:
          this.currentDish.adres_zdjecia &&
          require(`../assets/${this.currentDish.adres_zdjecia}`)
      }
    }
  }
}
</script>
