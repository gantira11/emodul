<template>
  <v-container class="my-4 d-flex justify-center flex-column">
    <v-card class="px-4 py-3 mb-5">
      <template v-if="emodul == null">
        <div class="d-flex justify-center">
          <h1 class="text-h6">Emodul tidak ditemukan</h1>
        </div>
      </template>

      <template v-else>
        <div class="d-flex justify-space-between ">
          <h1 class="text-h6">{{ matakuliah.matakuliah }} | {{ emodul.title }}</h1>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                icon 
                @click="addBookmark"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon color="blue" size="26">md mdi-star-outline</v-icon>
              </v-btn>
            </template>
            <span>Add to bookmark</span>
          </v-tooltip>
        </div>
        <h1 class="text-body-2 font-weight-light">
          {{ prodi.prodi }}
        </h1>
        <h1 class="text-body-1 font-weight-light pt-1">
          Oleh : {{ emodul.dosen }}
        </h1>
        <v-divider class="mt-2 mb-3"></v-divider>
        <h5 class="text-body-1 font-weight-bold">Deskripsi :</h5>
        <p class="">{{ emodul.deskripsi }}</p>
        <div v-for="item in emodul.modules" :key="item.id">
          <v-card class="pa-3 d-flex align-center" link :to="`${item.module}/`">
            <div class="img-doc"></div>
            <v-card-title
              class="text-body-2 font-weight-semibold pl-4 d-flex flex-wrap"
              >{{ item.module }}</v-card-title
            >
            <!-- <iframe :src="`${urlBE}/storage/public/emoduls/${item.module}`" frameborder="0"></iframe>
          {{ item.module }} -->
          </v-card>
        </div>
      </template>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "DetailEmodul",
  data() {
    return {
      emodul: [],
      urlBE: "http://localhost:8000",
      emoduls: [],
      matakuliah: [],
      prodi: [],
      db: null,
      bookmark: [],
      ready: false,
      addDisabled: false,
    };
  },
  async created() {
    this.db = await this.getDb();
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    retrieveData() {
      this.axios
        .get("emodul/" + this.$route.params.slug)
        .then((res) => {
          this.emodul = res.data.data[0]
          this.prodi = res.data.data[0].prodis
          this.matakuliah = res.data.data[0].matakuliahs
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open("emoduls", 1);

        request.onerror = (e) => {
          console.log("Error Opening db", e);
          reject("Error");
        };

        request.onsuccess = (e) => {
          resolve(e.target.result);
        };

        request.onupgradeneeded = (e) => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          let objectStore = db.createObjectStore("bookmark", {
            autoIncrement: true,
            keyPath: "id",
          });
          console.log(objectStore);
        };
      });
    },

    async addBookmark() {
      return new Promise((resolve) => {
        let trans = this.db.transaction(["bookmark"], "readwrite");

        trans.oncomplete = (e) => {
          this.setAlert({
            status: true,
            text: "Berhasil disimpan di bookmark",
            type: "success",
          });
          console.log(e);
          resolve();
        };

        trans.onerror = () => {
          this.setAlert({
            status: true,
            text: "Data sudah ada di bookmark",
            type: "success",
          });
          // reject();
        };

        let store = trans.objectStore("bookmark");
        store.add(this.emodul);
      });
    },
  },
  mounted() {
    this.retrieveData();
  },
};
</script>

<style scoped>
.img-doc {
  width: 50px;
  height: 50px;
  background-image: url("@/assets/images/document.webp");
  background-size: cover;
}
</style>
