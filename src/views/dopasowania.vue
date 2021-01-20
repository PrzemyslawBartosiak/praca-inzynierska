<template>
  <v-container>
    <v-row>
      <v-col md="4" v-for="match in matches" :key="match.id">
        <v-card max-width="500" class="d-flex align-content-start flex-wrap">
          <v-img
            max-height="400"
            :src="require(`../assets/${match.adres_zdjecia}`)"
          ></v-img>

          <v-card-title>{{ match.nazwa }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text ">
                {{ match.likes }} <v-icon class="pb-2">mdi-thumb-up</v-icon>
              </div>

              <div class="grey--text ml-4">
                {{ match.dislikes }}
                <v-icon class="pb-1">mdi-thumb-down</v-icon>
              </div>
            </v-row>

            <div class="my-4 subtitle-1">
              {{ match.cena }} • {{ match.restauracja }}
            </div>

            <div>
              {{ match.skladniki }}
            </div>
          </v-card-text>

          <v-row class="mb-2">
            <v-spacer></v-spacer
            ><v-btn
              color="success"
              to="/rezerwacjaDania"
              class="mt-3 mx-6"
              small
              >Zarezerwuj danie</v-btn
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    getDishImage(photoPath) {
      return {
        ...photoPath,
        photo: photoPath && require(`../assets/${photoPath}`)
      }
    }
  },
  computed: {
    matches() {
      return this.$store.state.user.matches
    }
  }
}
</script>
