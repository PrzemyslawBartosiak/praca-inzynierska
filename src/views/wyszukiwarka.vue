<template>
  <div>
    <v-card :loading="isLoading" class="mx-auto mt-5" max-width="500">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img :src="dishImage.photo" max-height="500"></v-img>

      <v-card-title>{{ currentDish.nazwa }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text ">
            {{ currentDish.likes }} <v-icon class="pb-2">mdi-thumb-up</v-icon>
          </div>

          <div class="grey--text ml-4">
            {{ currentDish.dislikes }}
            <v-icon class="pb-1">mdi-thumb-down</v-icon>
          </div>
        </v-row>

        <div class="my-4 subtitle-1">
          {{ currentDish.cena }} • {{ currentDish.restauracja }}
        </div>

        <div>
          {{ currentDish.skladniki }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <div v-if="currentDish.comments">
        <v-card-actions>
          <v-card-subtitle>Komentarze</v-card-subtitle>
          <v-spacer></v-spacer>

          <v-btn icon @click="showComments = !showComments">
            <v-icon>{{
              showComments ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="showComments">
            <v-list three-line>
              <div
                v-for="komentarz in currentDish.comments"
                :key="komentarz.id"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ komentarz.commenter }},
                      {{ komentarz.commentedOn }}</v-list-item-title
                    >
                    <v-list-item-subtitle>
                      {{ komentarz.comment }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </div>
        </v-expand-transition>
      </div>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions class="my-5 pb-5">
        <v-row class="d-flex justify-space-around">
          <v-btn class="mx-2" fab dark small color="red" @click="thumbsDown">
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="indigo"
            @click="favourite"
            v-bind:disabled="hasFavourited"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark small color="pink" @click="thumbsUp">
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-snackbar
      :timeout="3000"
      :value="showToast"
      absolute
      bottom
      center
      :color="toastColor"
    >
      {{ toastMessage }}
    </v-snackbar>
  </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase/app'

export default {
  name: 'wyszukiwarka',

  data: () => ({
    isLoading: false,
    dishes: [],
    favouriteDishes: [],
    currentDish: {},
    currentIndex: 0,
    showToast: false,
    toastColor: '',
    toastMessage: '',
    hasFavourited: false,
    showComments: false
  }),
  created() {
    this.$store.dispatch('user/bindMatchesRef')
    this.$store.dispatch('user/bindFavouritesRef')
    this.fetchDishes()
  },
  methods: {
    async fetchDishes() {
      const res = await db
        .collection('dania')

        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
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
      this.hasFavourited = false
      this.showToast = false

      if (this.partnerId) {
        let partnerRef = db.collection('users').doc(this.partnerId)
        const partnerLikedDishes = await partnerRef
          .collection('likedDishes')
          .where('nazwa', '==', this.currentDish.nazwa)
          .get()

        if (!partnerLikedDishes.empty) {
          await userRef.collection('matches').add({ ...this.currentDish })
          await partnerRef.collection('matches').add({ ...this.currentDish })
        }
      }

      this.incrementCurrentIndex()
    },
    async favourite() {
      let userRef = db.collection('users').doc(this.authUserId)

      let favouriteDishRef = userRef
        .collection('favouriteDishes')
        .where('nazwa', '==', this.currentDish.nazwa)
      await favouriteDishRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete()
        })
      })
      await userRef.collection('favouriteDishes').add({ ...this.currentDish })
      this.toastColor = 'success'
      this.toastMessage = 'Dodaliśmy to danie do swojego schowka!'
      this.showToast = true
      this.hasFavourited = true
    },
    async thumbsDown() {
      await this.incrementCurrentIndex()
      this.hasFavourited = false
      this.showToast = false
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
