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
          <CardContent
            :title="`${emodul.title} | ${emodul.dosen}`"
            :body="`${emodul.deskripsi}`"
            :route="`${emodul.slug}`"
            btnText="Lihat Details Emodul"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import CardContent from "@/components/mahasiswa/CardContent.vue";

export default {
  name: "BookarkView",
  data() {
    return {
      emoduls: [],
      db: null,
    };
  },
  components: {
    CardContent,
  },
  async created() {
    this.db = await this.getDb();
    this.getBookmark();
  },
  methods: {
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
  },
};
</script>

<style></style>
