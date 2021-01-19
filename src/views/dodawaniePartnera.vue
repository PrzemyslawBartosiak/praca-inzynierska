<template>
  <v-container fill-height fluid max-width="500">
    <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card>
            <v-container>
              <h2>Szukanie partnera</h2>
              <p>
                Wprowadź e-mail osoby, z którą chcesz zdecydować, co dobrego
                dzisiaj zamówić.
              </p>
              <v-row>
                <v-form ref="form" v-model="form">
                  <v-col class="d-inline-flex">
                    <v-text-field
                      v-model="email"
                      :rules="[rules.emailRules]"
                      filled
                      label="Adres e-mail"
                      type="email"
                    >
                    </v-text-field>
                    <v-btn
                      @click="searchUsersByEmail"
                      :disabled="!form"
                      large
                      color="Primary"
                      class="ml-2 mt-2"
                      >Szukaj</v-btn
                    >
                  </v-col>
                </v-form>
              </v-row>
              <v-row v-if="foundUser">
                <v-col class="d-inline-flex">
                  <v-card>
                    <v-card-text>
                      <div>
                        {{ foundUser.email }}
                      </div>
                      <p class="display-1 text-primary">
                        {{ foundUser.name }}
                      </p>
                      <div class="text-primary">
                        Aby dodać tego użytkownika jako partnera, kliknij
                        poniższy przycisk.
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="primary"
                        @click="addUserAsPartner(foundUser.id)"
                      >
                        Dodaj
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="message"> </v-row>
              <v-col>
                <h3>{{ message }}</h3>
              </v-col>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
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
    </v-container>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  data: () => ({
    form: false,
    isLoading: false,
    showToast: false,
    toastColor: '',
    toastMessage: '',
    email: '',
    foundUser: null,
    message: '',
    rules: {
      emailRules: [
        value => !!value || 'E-mail jest wymagany.',
        value =>
          value.indexOf('@') !== 0 ||
          'E-mail powinien posiadać nazwę przed znakiem @.',
        value => value.includes('@') || 'E-mail powinien zawierać symbol @.',
        value =>
          value.indexOf('.') - value.indexOf('@') > 1 ||
          'E-mail powinień posiadać poprawną domenę.',
        value =>
          value.includes('.') || 'Email powinien zawierać symbol kropki.',
        value =>
          value.indexOf('.') <= value.length - 3 ||
          'E-mail powinień posiadać poprawną domenę.'
      ]
    }
  }),

  methods: {
    async searchUsersByEmail() {
      this.isLoading = true
      this.message = ''
      this.foundUser = null

      const snapshot = await db
        .collection('users')
        .where('email', '==', this.email.toLowerCase())
        .get()

      if (!snapshot.empty) {
        const userId = snapshot.docs[0].id
        const userData = snapshot.docs[0].data()

        this.foundUser = {
          id: userId,
          ...userData
        }
      } else {
        this.message = 'Nie znaleziono żadnego użytkownika z tym e-mailem'
      }
      this.isLoading = false
    },

    async addUserAsPartner(id) {
      try {
        const authUserId = this.$store.state.user.id
        await db
          .collection('users')
          .doc(authUserId)
          .update({ partnerId: id })
        this.$store.dispatch('user/setPartnerId', id)

        this.toastColor = 'success'
        this.toastMessage = 'Udało się dodać partnera'
        this.showToast = true
      } catch (error) {
        this.toastColor = 'error'
        this.toastMessage = 'Nastąpił niespodziewany błąd, spróbuj ponownie'
        this.showToast = true
      }
    }
  }
}
</script>
