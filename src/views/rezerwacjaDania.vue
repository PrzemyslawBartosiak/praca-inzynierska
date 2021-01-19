<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-spacer></v-spacer>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card align="center" justify="center">
          <v-card-title class="primary">
            <h1 class="display-1 mx-auto">Rezerwacja</h1>
          </v-card-title>
          <!-- <v-btn v-on:click="showAlert">Test</v-btn> -->

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="mt-2"
              ><v-spacer></v-spacer
              ><v-col cols="12" sm="5"
                ><v-select
                  v-model="selectRestauracja"
                  :items="restauracje"
                  :rules="[v => !!v || 'Musisz wybrać restauracje']"
                  label="Restauracja"
                  required
                  class="px-1 mt-3"
                  outlined
                ></v-select
              ></v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="5"
                ><v-select
                  v-model="selectDanie"
                  :items="dania"
                  :rules="[v => !!v || 'Musisz wybrać danie']"
                  label="Danie"
                  required
                  class="px-1 mt-3"
                  outlined
                ></v-select></v-col
              ><v-spacer></v-spacer
            ></v-row>
          </v-form>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="5">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Wybierz dzień"
                    :rules="[v => !!v || 'Musisz wybrać dzień']"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="5">
              <v-select
                v-model="selectGodzina"
                :items="godzina"
                :rules="[v => !!v || 'Musisz wybrać godzine']"
                label="Godzina"
                required
                class="px-1"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row
            ><v-spacer></v-spacer>
            <v-col cols="10"
              ><v-text-field
                v-model="imie"
                :rules="[v => !!v || 'Musisz podać swoje imię']"
                label="Imie"
                required
              ></v-text-field></v-col
            ><v-spacer></v-spacer
          ></v-row>
          <v-row
            ><v-spacer></v-spacer>
            <v-col cols="10"
              ><v-text-field
                v-model="numerTelefonu"
                :rules="[v => !!v || 'Musisz podać swój numer telefonu']"
                label="Numer telefonu"
                required
              ></v-text-field></v-col
            ><v-spacer></v-spacer
          ></v-row>
          <v-divider class="mx-5 my-5"></v-divider>
          <v-card-actions>
            <v-btn color="info" to="/ulubione" class="mx-6">Ulubione</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" to="/rezerwacjaDaniaPotwierdzenie" class="mx-6"
              >Dokonaj rezerwacji</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'rezerwacjaDania',

  data: () => ({
    picker: new Date().toISOString().substr(0, 10),
    valid: true,

    selectRestauracja: null,
    selectDanie: null,
    selectGodzina: null,
    imie: null,
    numerTelefonu: null,
    restauracje: ['Huong Sen', 'American Style', 'Baron Pizza'],
    dania: [
      'Pizza peperoni',
      'Burger Kozak',
      'Burger Alabama',
      'Pizza capricciosa',
      'Wołowina z ryżem i warzywami'
    ],
    godzina: ['14:30', '16:00', '16:15', '16:30', '17:30']
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
