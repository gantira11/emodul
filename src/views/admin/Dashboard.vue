<template>
  <v-container fluid class="pa-7 grey lighten-4 content">
    <div class="mb-5">
      <span class="text-h5">Dashboard</span>
      <v-divider width="10%"></v-divider>
    </div>

    <br />

    <v-row class="d-flex justify-center">
      <v-col
        class="mt-1"
        lg="3"
        md="6"
        sm="12"
        cols="12"
        v-for="item in items"
        :key="item.title"
      >
        <v-card class="pa-1" width="100%">
          <div class="d-flex grow flex-wrap justify-space-between ml-1">
            <v-sheet
              :color="item.color"
              max-height="85"
              min-width="85"
              width="auto"
              elevation="6"
              dark
              rounded
              class="d-flex align-center justify-center mt-n4 px-2 py-2"
            >
              <v-icon size="40">{{ item.icons }}</v-icon>
            </v-sheet>
            <div>
              <v-card-title class="text-caption">
                {{ item.title }}
              </v-card-title>
              <v-card-subtitle class="d-flex justify-end text-body-1">
                {{ item.subTitle }}
              </v-card-subtitle>
            </div>
          </div>

          <v-divider class="mt-3"></v-divider>

          <router-link
            :to="{ name: item.route }"
            class="router-link black--text"
          >
            <div class="d-flex justify-space-between mt-1 px-1">
              <span class="text-caption d-flex align-center">
                {{ item.actionText }}
              </span>
              <v-icon>md mdi-chevron-right</v-icon>
            </div>
          </router-link>
        </v-card>
      </v-col>
    </v-row>

    <v-card class="pa-1 mt-10" width="100%">
      <div class="d-flex grow flex-wrap justify-space-between ml-1">
        <v-sheet
          color="green"
          max-height="85"
          min-width="85"
          width="auto"
          elevation="6"
          dark
          rounded
          class="d-flex align-center justify-center mt-n4 px-2 py-2"
        >
          <v-icon size="40"> md mdi-book-outline </v-icon>
        </v-sheet>
        <div>
          <v-card-title class="text-caption justify-end"> Emodul </v-card-title>
          <v-card-subtitle class="d-flex justify-end text-body-1">
            Berdasarkan Program Studi
          </v-card-subtitle>
        </div>
      </div>
      <br>
      <div class="d-flex flex-column px-2 py-2 no-gutters mt-2" v-for="prodi in prodis" :key="prodi.id">
        <router-link :to="{ path: 'dashboard/'+ prodi.slug }" class='router-link black--text'>
          <v-row class="justify-space-between px-1">
            <v-col>
              <span class="text-body-2 no-gutters">{{ prodi.prodi }}</span>
            </v-col>
            <v-col cols="1" class="d-flex justify-center">
              <span class="text-body-2">{{ prodi.emoduls.length }}</span>
            </v-col>
          </v-row>
          <v-divider class="mt-2"></v-divider>
        </router-link>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "dashboard-view",
  data() {
    return {
      data: [],
      prodis: [],
      items: [
        {
          color: "#FD9A13",
          icons: "md mdi-book-open-outline",
          title: "E-Modul",
          subTitle: "0",
          actionText: "Lihat semua E-Modul",
          route: "emoduls",
        },
        {
          color: "#E91E63",
          icons: "md mdi-account",
          title: "User",
          subTitle: "0",
          actionText: "Lihat semua User",
          route: "users",
        },
        {
          color: "#4CAF50",
          icons: "md mdi-chart-arc",
          title: "Program Studi",
          subTitle: "0",
          actionText: "Lihat semua Program Studi",
          route: "prodi",
        },
        {
          color: "#00CAE3",
          icons: "md mdi-book-open-page-variant",
          title: "Matakuliah",
          subTitle: "0",
          actionText: "Lihat semua Matakuliah",
          route: "matakuliah",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      sideBar: "sideBar",
    }),
  },
  methods: {
    ...mapActions({
      setSideBar: "setSideBar",
    }),
    retrieveData() {
      this.axios
        .get("/dashboard")
        .then((res) => {
          this.items[0]["subTitle"] = res.data.emodul.length;
          this.items[1]["subTitle"] = res.data.user.length;
          this.items[2]["subTitle"] = res.data.prodi.length;
          this.items[3]["subTitle"] = res.data.matkul.length;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    retrieveEmodulByProdi() {
      this.axios.get("/emodul-prodi").then((res) => {
        this.prodis = res.data.data
      });
    },
  },
  mounted() {
    this.retrieveData();
    this.retrieveEmodulByProdi();
  },
};
</script>
<style lang="sass">
.barBtn
  border-radius: 100px
</style>
