<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-spacer></v-spacer>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card align="center" justify="center">
          <v-card-title class="primary">
            <h1 class="display-1 mx-auto">Aktualizacja danych</h1>
          </v-card-title>
          <!-- <v-btn v-on:click="showAlert">Test</v-btn> -->
          <v-card-text class="mt-4"
            >Zaktualizowaliśmy twój profil!
          </v-card-text>
          <v-card-text class="pt-0"
            >Możesz teraz ponownie zalogować się na swoje konto.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" to="/logowanie" class="mx-6">Zaloguj się</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'aktualizacjaDanych'
}
</script>
