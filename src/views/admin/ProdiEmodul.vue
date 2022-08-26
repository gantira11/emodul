<template>
  <v-container fluid class="pa-7 grey lighten-4 content">
    <br />

    <v-row class="d-flex justify-center">
      <v-card class="pa-1" width="100%">
        <div class="d-flex grow flex-wrap ml-2">
          <v-sheet
            color="#FD9A13"
            min-height="85"
            min-width="85"
            width="auto"
            elevation="6"
            dark
            rounded
            class="d-flex align-center justify-center mt-n5 px-2 py-2 ml-2"
          >
            <v-icon size="40">md mdi-book-open-outline</v-icon>
          </v-sheet>
          <p class="text-h5 ml-5 mt-3">List Emodul {{ prodi.prodi }}</p>
        </div>

        <v-card-title class="mt-2">
          <v-spacer></v-spacer>

          <v-text-field
            class="text-subtitle-2"
            label="Search"
            single-line
            hide-details
            color="#000"
            v-model="search"
          >
            <template v-slot:append>
              <v-icon>md mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </v-card-title>

        <div v-for="item in emoduls" :key="item.id">
          <v-card class="pa-3 d-flex align-center mx-2 mb-3" link :to="{ path: '../detail-emodul/' + item.slug }">
            <div class="img-doc"></div>
            <v-card-title
              class="text-body-2 font-weight-semibold pl-4 d-flex flex-wrap"
              >{{ item.matakuliahs.matakuliah }} | {{ item.title }}</v-card-title
            >
          </v-card>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProdiEmodul",
  data() {
    return {
      prodi: [],
      emoduls: [],
      matakuliah: [],
      search: "",
    };
  },
  methods: {
    retrieveEmodul() {
      this.axios.get("/emodul-prodi/" + this.$route.params.slug).then((res) => {
        this.prodi = res.data.data[0]
        this.emoduls = res.data.data[0].emoduls
        console.log(this.prodi)
      });
    },
  },
  mounted() {
    this.retrieveEmodul();
  },
};
</script>

<style>
.img-doc {
  width: 50px;
  height: 50px;
  background-image: url("@/assets/images/document.webp");
  background-size: cover;
}
</style>
