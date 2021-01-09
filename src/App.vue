<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>Ocenszame</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="userId" to="/dodawanie-partnera" text>Dodaj partnera</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),

  computed: {
    userId() {
      return this.$store.state.user.id
    }
  }
}
</script>
