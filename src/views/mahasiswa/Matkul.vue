<template>
  <v-container>
    <v-card class="pa-5">
      <v-row class="d-flex align-baseline justify-space-between pa-4">
        <h1 class="text-h6 font-weight-regular mb-3">
          Matakuliah {{ prodi.prodi }}
        </h1>
        <div class="" style="width: 350px">
          <v-text-field
            v-model="search"
            label="Search"
            append-icon="md mdi-magnify"
            solo
          >
          </v-text-field>
        </div>
      </v-row>

      <v-row class="my-2">
        <v-col
          v-for="matkul in filteredList"
          :key="matkul.id"
          cols="12"
          sm="6"
          md="6"
          lg="4"
        >
          <CardContent
            :title="matkul.matakuliah"
            :body="`Kode ` + matkul.kode"
            :route="`${matkul.slug}/`"
            btnText="Lihat Semua Emodul"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import CardContent from "@/components/mahasiswa/CardContent.vue";

export default {
  name: "ProdiView",
  data() {
    return {
      search: "",
      prodi: [],
      matakuliahs: [],
    };
  },
  components: {
    CardContent,
  },
  computed: {
    filteredList() {
      return this.matakuliahs.filter((matkul) => {
        return (
          matkul.matakuliah.toLowerCase().includes(this.search.toLowerCase()) ||
          matkul.kode.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    retrieveData() {
      this.axios.get("/prodi/" + this.$route.params.slug).then((res) => {
        this.prodi = res.data.data[0];
        this.matakuliahs = res.data.data[0].matakuliahs;
      });
    },
  },
  mounted() {
    this.retrieveData();
  },
};
</script>

<style scoped>

</style>
