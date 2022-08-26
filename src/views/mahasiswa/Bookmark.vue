<template>
  <v-container class="my-4 d-flex justify-center flex-column">
    <v-card class="px-4 py-3 mb-5">
      <v-row class="d-flex align-baseline justify-space-between pa-3">
        <h1 class="text-h6 font-weight-regular mb-3">Bookmark</h1>
      </v-row>

      <v-row class="my-2">
        <v-col
          v-for="emodul in emoduls"
          :key="emodul.id"
          cols="12"
          sm="6"
          md="6"
          lg="4"
        >
          <v-card>
            <v-img
              :src="emodul.prodis.image == null ? `${beUrl}storage/images/defaultBanner.webp` : `${beUrl}storage/images/${emodul.prodis.image}`"
              height="100"
              contain
            ></v-img>
            <v-card-title class="text-body-2">
              {{ emodul.title }} | {{ emodul.dosen }}
            </v-card-title>
            <v-card-subtitle 
              class="text--primary text-caption pb-0"
            >
              {{ emodul.matakuliahs.matakuliah }}
            </v-card-subtitle>
            <v-card-subtitle  
              class="text--primary text-caption pb-0 pt-1"
            >
              {{ emodul.deskripsi }}
            </v-card-subtitle>
            <v-card-actions 
              class="d-flex justify-end ma-none"
            >
              <router-link 
                class="apparance-none" 
                :to="emodul.slug"
              >
                <v-btn class="text-caption" color="primary" text>
                  Lihat detail Emodul
                </v-btn>
              </router-link>
              <v-btn 
                class="text-caption" 
                color="primary" 
                text
                @click='deleteBookmark(emodul.id)'
              >Hapus</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "BookarkView",
  data() {
    return {
      emoduls: [],
      db: null,
      beUrl: process.env.VUE_APP_BACKEND
    };
  },
  async created() {
    this.db = await this.getDb();
    this.getBookmark();
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set'
    }),
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
    async getBookmark() {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction(["bookmark"], "readonly");
        trans.oncomplete = () => {
          resolve();
        };

        trans.onerror = () => {
          reject();
        };

        let store = trans.objectStore("bookmark");

        store.openCursor().onsuccess = (e) => {
          let cursor = e.target.result;

          if (cursor) {
            this.emoduls.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },
    async deleteBookmark(id) {
      return new Promise((resolve) => {
        let trans = this.db.transaction(["bookmark"], "readwrite");
        trans.oncomplete = (e) => {
          this.setAlert({
            status: true,
            text: "Berhasil dihapus",
            type: "success",
          });
          console.log(e);
          resolve();
          this.$router.go(0);
        };

        let store = trans.objectStore("bookmark");
        store.delete(id);
      });
    },
  },
};
</script>

<style>
.apparance-none {
  text-decoration: none !important;
}
</style>
