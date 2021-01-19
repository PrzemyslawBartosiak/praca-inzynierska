<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-spacer></v-spacer>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card align="center" justify="center">
          <v-card-title class="primary">
            <h1 class="display-1 mx-auto">Potwierdzenie</h1>
          </v-card-title>
          <!-- <v-btn v-on:click="showAlert">Test</v-btn> -->
          <v-card-text class="mt-4">
            <h2>Dziękujemy za złożenie rezerwacji na naszym profilu!</h2>
          </v-card-text>
          <v-card-text class="pt-0"
            >Restauracja powiadomi Cię za pomocą wiadomości sms p przyjęciu lub
            odrzuceniu twojego zamówienia.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" to="/wyszukiwarka" class="mx-6"
              >Przeglądaj dalej</v-btn
            ><v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'rezerwacjaDaniaPotwierdzenie'
}
</script>
