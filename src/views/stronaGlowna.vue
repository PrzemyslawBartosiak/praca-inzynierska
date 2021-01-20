<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-row>
          <v-spacer></v-spacer>

          <h2>
            Nie masz pomysłu jakie jedzenie zamówić?
          </h2>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <p
            class="font-weight-light text-lg-h6 text-md-subtitle-1 text-sm-body-1 text-body-2 mt-2"
          >
            Załóż konto a pomożemy Ci dokonać wyboru!
          </p>
          <v-spacer></v-spacer>
        </v-row>
        <v-row
          ><v-spacer></v-spacer
          ><v-img src="@/assets/pngtreeBurger.png" max-width="360"></v-img
          ><v-spacer></v-spacer
        ></v-row>

        <v-row class="mt-2">
          <v-spacer></v-spacer
          ><a href="https://pngtree.com/so/hamburger"
            >hamburger png from pngtree.com</a
          ><v-spacer></v-spacer
        ></v-row>
        <v-row class="my-6">
          <v-spacer></v-spacer
          ><v-btn color="success" to="/rejestracja" class="mt-3 mx-6"
            >Rejestracja</v-btn
          ><v-btn color="info" to="/logowanie" class="mt-3 mx-6"
            >Logowanie</v-btn
          ><v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'stronaGlowna',
  data: () => ({})
}
</script>
