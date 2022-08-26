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
          <p class="text-h5 ml-5 mt-3">Detail Emodul</p>
        </div>

        <v-card-title class="mt-2">
          <v-spacer></v-spacer>
        </v-card-title>
        <div>
          <v-row class="px-2 py-2 d-flex align-center justify-center">
            <v-col cols="5" sm="2">Title</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6" sm="9">{{ emodul.title }}</v-col>
          </v-row>
          <v-divider />
          <v-row class="px-2 py-2 d-flex align-center justify-center">
            <v-col cols="5" sm="2">Program Studi</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6" sm="9">{{ prodi.prodi }}</v-col>
          </v-row>
          <v-divider />
          <v-row class="px-2 py-2 d-flex align-center justify-center">
            <v-col cols="5" sm="2">Matakuliah</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6" sm="9">{{ matakuliah.matakuliah }}</v-col>
          </v-row>
          <v-divider />
          <v-row class="px-2 py-2 d-flex align-center justify-center">
            <v-col cols="5" sm="2">Deskripsi</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6" sm="9">{{ emodul.deskripsi }}</v-col>
          </v-row>
          <v-divider />
          <v-row class="px-2 py-2 d-flex align-center justify-center">
            <v-col cols="5" sm="2">Dosen</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6" sm="9">{{ emodul.dosen }}</v-col>
          </v-row>
          <v-divider />
          <v-row class="px-2 py-2 d-flex align-center justify-center">
            <v-col cols="5" sm="2">Module</v-col>
            <v-col cols="1">:</v-col>
            <v-col cols="6" sm="9"></v-col>
          </v-row>
          <br>
          <div v-for="item in modules" :key="item.id">
          <v-card class="pa-3 d-flex align-center mx-2 mb-3" link :to="{ path: '../view-emodul/' + item.module }">
            <div class="img-doc"></div>
            <v-card-title
              class="text-body-2 font-weight-semibold pl-4 d-flex flex-wrap"
              >{{ item.module }}</v-card-title
            >
          </v-card>
        </div>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EmodulDetail",
  data() {
    return {
      emodul: [],
      matakuliah: [],
      prodi: [],
      modules: [],
    };
  },
  methods: {
    retrieveData() {
      this.axios("/emodul/" + this.$route.params.slug).then((res) => {
        this.emodul = res.data.data[0];
        this.matakuliah = res.data.data[0].matakuliahs
        this.prodi = res.data.data[0].prodis
        this.modules = res.data.data[0].modules
        console.log(this.emodul)
      });
    },
  },
  mounted() {
    this.retrieveData();
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
