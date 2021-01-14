<template>
  <div>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <!-- <v-img src="./assets/aocIcon-32x32.png"></v-img> -->
            <v-list-item-content>Oceń szame</v-list-item-content>
            <v-btn icon @click.stop="sideNav = !sideNav">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider class="mx-2"></v-divider>

          <v-list-item v-if="isLoggedIn" to="/">
            <v-list-item-icon>
              <v-icon>mdi-monitor</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Strona główna</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isLoggedIn" to="/dopasowania">
            <v-list-item-icon>
              <v-icon>mdi-book-open-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Dopasowania</v-list-item-content>
          </v-list-item>
          <v-divider class="mx-2"></v-divider>

          <v-list-item v-if="!isLoggedIn" to="/logowanie">
            <v-list-item-icon>
              <v-icon>mdi-lock-open</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Logowanie</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="!isLoggedIn" to="/rejestracja">
            <v-list-item-icon>
              <v-icon>mdi-shield-lock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Rejestracja</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isLoggedIn" to="/profil">
            <v-list-item-icon>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Profil</v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Wyloguj</v-list-item-content>
          </v-list-item>
          <v-divider class="mx-2"></v-divider>

          <v-list-item @click="toggleTheme">
            <v-list-item-icon>
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-list-item-icon>
            <v-list-item-content>Motyw</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark :key="$route.fullPath">
      <v-app-bar-nav-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-btn to="/" class="hidden-sm-and-down" text rounded
        >Strona Główna</v-btn
      >
      <v-spacer></v-spacer>

      <v-btn
        v-if="!userId"
        to="/logowanie"
        class="hidden-sm-and-down"
        text
        rounded
        >Logowanie</v-btn
      >
      <v-btn
        v-if="!userId"
        to="/rejestracja"
        class="hidden-sm-and-down"
        text
        rounded
        >Rejestracja</v-btn
      >
      <v-btn v-if="userId" to="/profil" class="hidden-sm-and-down" text rounded
        >Profil</v-btn
      >
      <v-btn
        v-if="userId"
        v-on:click="logout"
        class="hidden-sm-and-down"
        text
        rounded
        >Wyloguj</v-btn
      >
      <v-btn @click="toggleTheme" class="hidden-sm-and-down" text rounded>
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  data: () => ({
    sideNav: false,
    isLoggedIn: false
  }),

  methods: {
    toggleTheme() {
      this.$vuetify.theme.themes.dark.anchor = '#41B883'
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    async logout() {
      await firebase.auth().signOut()
      this.$store.dispatch('user/clearUserData')
      this.$router.replace('/')
      this.isLoggedIn = false
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.id
    }
  }
}
</script>
