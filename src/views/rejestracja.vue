<template>
  <v-container fill-height fluid>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="10" md="6" lg="6">
        <v-card class="mx-auto">
          <v-card-title class="primary">
            <h1 class="display-1 mx-auto">Rejestracja</h1>
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
            <v-form
              ref="signUpForm"
              v-model="formValidity"
              @submit.prevent="registerMethod"
            >
              <v-text-field
                label="Imię"
                type="text"
                v-model="name"
                :rules="nameRules"
                prepend-icon="mdi-account"
                required
              ></v-text-field>

              <v-text-field
                label="E-mail"
                type="email"
                v-model="email"
                :rules="emailRules"
                prepend-icon="mdi-mail"
                required
              ></v-text-field>

              <v-text-field
                label="Hasło"
                type="password"
                v-model="userPassword"
                :rules="passwordRules"
                prepend-icon="mdi-lock"
                required
              ></v-text-field>

              <v-text-field
                label="Powtórz hasło"
                type="password"
                v-model="userPasswordRepeat"
                :rules="[
                  userPassword === userPasswordRepeat ||
                    'Hasła muszą się zgadzać'
                ]"
                prepend-icon="mdi-lock"
                required
              ></v-text-field>

              <v-checkbox
                label="Zgadzam się na warunki użytkowania"
                v-model="agreeToTerms"
                :rules="agreeToTermsRules"
                required
              ></v-checkbox>
              <v-alert
                v-if="errorMsg"
                border="top"
                color="red"
                class="ml-5 mr-5"
              >
                {{ errorMsg }}
              </v-alert>
              <v-card-actions class="mt-2">
                <v-btn color="error" @click="resetForm">Wyczyść</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  class="mr-4"
                  :disabled="!formValidity"
                  :loading="isLoading"
                  @click="signUpWithEmailAndPassword"
                  >Zatwierdź</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
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
  data: () => ({
    agreeToTerms: false,
    isLoading: false,
    form: false,
    browsers: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Brave'],

    errorMsg: '',

    nameRules: [value => !!value || 'To pole jest wymagane'],
    agreeToTermsRules: [
      value => !!value || 'Musisz zgodzić się na warunki użytkowania.'
    ],

    email: '',
    emailRules: [
      value => !!value || 'E-mail jest wymagany.',
      value =>
        value.indexOf('@') !== 0 ||
        'E-mail powinien posiadać nazwę przed znakiem @.',
      value => value.includes('@') || 'E-mail powinien zawierać symbol @.',
      value =>
        value.indexOf('.') - value.indexOf('@') > 1 ||
        'E-mail powinień posiadać poprawną domenę.',
      value => value.includes('.') || 'Email powinien zawierać symbol kropki.',
      value =>
        value.indexOf('.') <= value.length - 3 ||
        'E-mail powinień posiadać poprawną domenę.'
    ],

    userPassword: '',
    passwordRules: [
      value => !!value || 'Hasło jest wymagane.',
      value =>
        (value && value.length >= 8) || 'Hasło powinno mieć 8 znaków długości.',
      value =>
        (value && value.length < 16) || 'Hasło musi być krótsze niż 16 znaków',

      value =>
        /(?=.*[A-Z])/.test(value) || 'Hasło musi zawierać jedną dużą literę.',
      value => /(?=.*\d)/.test(value) || 'Hasło musi zawierać jedną liczbę'
    ],

    userPasswordRepeat: '',
    passwordRepeatRules: [
      value => !!value || 'Musisz powtórzyć hasło',
      value => userPassword || 'Hasła muszą być identyczne'
    ],
    formValidity: false
  }),

  methods: {
    redirectToLogin() {
      setTimeout(() => this.$router.push({ path: '/logowanie' }), 4500)
    },
    resetForm() {
      this.$refs.signUpForm.reset()
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation()
    },
    validateForm() {
      this.$refs.signUpForm.validate()
    },

    async signUpWithEmailAndPassword() {
      this.isLoading = true
      try {
        const authRes = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.email.toLowerCase(),
            this.userPassword
          )

        await db
          .collection('users')
          .doc(authRes.user.uid)
          .set({ name: this.name, email: this.email.toLowerCase() })

        this.$store.dispatch('user/setUserData', {
          id: authRes.user.uid,
          name: this.name,
          email: this.email.toLowerCase(),
          partnerId: ''
        })

        this.$router.replace({ name: 'wyszukiwarka' })
      } catch (error) {
        this.errorMsg = 'Miał miejsce niespodziewany błąd!'
        if (error.message) {
          this.errorMsg = error.message
        }
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.max-height {
  height: 100%;
}
</style>
