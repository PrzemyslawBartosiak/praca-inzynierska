<template>
  <v-container fill-height fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="mx-auto">
          <v-card-title class="primary">
            <h1 class="display-1 mx-auto">Logowanie</h1>
          </v-card-title>

          <v-overlay :value="isLoading">
            <v-progress-circular
              color="primary"
              indeterminate
              size="64"
            ></v-progress-circular>
          </v-overlay>

          <v-card-text class="mt-3">
            <v-form ref="form" v-model="form">
              <v-text-field
                label="E-mail"
                prepend-icon="mdi-account-circle"
                v-model="email"
                :rules="[rules.required]"
                type="email"
              />

              <v-text-field
                v-model="userPassword"
                :type="showPassword ? 'text' : 'password'"
                :rules="[rules.required]"
                label="Hasło"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5">
            {{ errorMsg }}
          </v-alert>
          <v-card-actions class="mt-2">
            <v-btn :to="'rejestracja'" color="success">Zarejestruj się</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!form"
              color="info"
              :loading="isLoading"
              v-on:click="signInWithEmailAndPassword"
              >Zaloguj</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  data() {
    return {
      showPassword: false,
      email: '',
      userPassword: '',
      errorMsg: '',
      form: false,
      isLoading: false,
      rules: {
        required: v => !!v || 'To pole jest wymagane'
      }
    }
  },
  methods: {
    async signInWithEmailAndPassword() {
      this.isLoading = true
      try {
        const authRes = await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.email.toLowerCase(),
            this.userPassword
          )
        const dbUser = await db
          .collection('users')
          .doc(authRes.user.uid)
          .get()

        const userData = dbUser.data()
        this.$store.dispatch('user/setUserData', {
          id: dbUser.id,
          name: userData.name,
          email: userData.email,
          partnerId: userData.partnerId || '',
          dashesDbPage: userData.dishesDbPage || 1
        })

        this.$router.replace({ name: 'Home' })
      } catch (error) {
        this.errorMsg = 'Miał miejsce niespodziewany błąd!'
        if (error.message) {
          this.errorMsg = error.message
        }
      }
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.card {
  font-weight: 400;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 2px 10px 0px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
