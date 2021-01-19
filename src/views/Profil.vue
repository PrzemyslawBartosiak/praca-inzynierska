<template>
  <v-container fill-height fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="10" md="6" lg="6">
        <v-card class="mx-auto">
          <v-card-title class="primary">
            <h1 class="display-1 mx-auto">Profil</h1>
          </v-card-title>
          <v-overlay :value="isLoading">
            <v-progress-circular
              color="primary"
              indeterminate
              size="64"
            ></v-progress-circular>
          </v-overlay>

          <!-- <v-btn v-on:click="showAlert">Test</v-btn> -->
          <v-card-text>
            <v-form ref="form" v-model="form">
              <v-text-field
                label="Imię"
                type="text"
                v-model="profile.name"
                :rules="[rules.required]"
                prepend-icon="mdi-mail"
                required
              ></v-text-field>

              <v-text-field
                label="E-mail"
                type="email"
                v-model="profile.email"
                :rules="[rules.required]"
                prepend-icon="mdi-mail"
                required
              ></v-text-field>

              <v-alert
                v-if="errorMsg"
                border="top"
                color="red"
                class="ml-5 mr-5"
              >
                {{ errorMsg }}
              </v-alert>
              <v-card-actions class="mt-2">
                <v-btn
                  color="primary"
                  class="mr-4"
                  :disabled="!form"
                  :loading="isLoading"
                  @click="updateProfile"
                  small
                  >Aktualizuj dane</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="info" class="mr-3" @click="resetPassword" small
                  >Zresetuj hasło</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
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
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'

export default {
  data: () => ({
    isLoading: false,
    form: false,

    uid: '',
    errorMsg: '',

    showToast: false,
    toastColor: '',
    toastMessage: '',
    profile: {
      name: null,
      email: null
    },
    rules: {
      required: v => !!v || 'To pole jest wymagane'
    }
  }),

  methods: {
    resetForm() {
      this.$refs.signUpForm.reset()
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation()
    },
    validateForm() {
      this.$refs.signUpForm.validate()
    },
    resetPassword() {
      const auth = firebase.auth()
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          this.toastColor = 'success'
          this.toastMessage =
            'Na twój adres został wysłany mail z linkiem do zmiany hasła.'
          this.showToast = true
        })
        .catch(error => {
          this.toastColor = 'error'
          this.toastMessage = 'Nastąpił niespodziewany błąd, spróbuj ponownie'
          this.showToast = true
        })
    },
    async updateProfile() {
      const newName = this.profile.name
      var newEmail = this.profile.email
      try {
        await db
          .collection('users')
          .doc(this.authUserId)
          .update({ name: newName, email: newEmail })
        this.$store.dispatch('user/setUserData', {
          name: this.profile.name,
          email: this.profile.email
        })
      } catch (error) {
        this.toastColor = 'error'
        this.toastMessage = 'Nastąpił niespodziewany błąd, spróbuj ponownie'
        this.showToast = true
      }

      const user = firebase.auth().currentUser
      this.$router.replace('/aktualizacjaDanych')
      this.isLoggedIn = false
      user
        .updateEmail(newEmail)
        .then(function() {})
        .catch(function(error) {
          // An error happened.
        })
    }
  },

  computed: {
    authUserId() {
      return this.$store.state.user.id
    }
  }
}
</script>

<style scoped>
.max-height {
  height: 100%;
}
</style>
