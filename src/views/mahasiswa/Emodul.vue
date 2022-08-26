<template>
  <v-container>
    <v-card
      class="pa-5"
    >
      <v-row 
        class="d-flex align-baseline justify-space-between pa-4"
      >
        <h1 class="text-h6 font-weight-regular mb-3">
          Emodul {{ matakuliah.matakuliah }}
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

      <v-row class="my-2 ">
        <v-col
          v-for="emodul in filteredList"
          :key="emodul.id"
          cols="12"
          sm="6"
          md="6"
          lg="4"
        >
          <CardContent 
            :image="matakuliah.prodis.image != null ? `${beUrl}/storage/images/${matakuliah.prodis.image}` : `${beUrl}/storage/images/defaultBanner.webp`"
            :title="`${emodul.title} | ${emodul.dosen}`" 
            :body="`${emodul.deskripsi}`" 
            :route="`${emodul.slug}/`"
            btnText="Lihat Details Emodul"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import CardContent from '@/components/mahasiswa/CardContent.vue'


export default {
  name: 'EmodulView',
  data() {
    return {
      search: '',
      matakuliah: [],
      emoduls: [],
      slugProdi: '',
      slugMatkul: '',
      beUrl: process.env.VUE_APP_BACKEND
    }
  },
  components: {
    CardContent
  },
  computed: {
    filteredList() {
      return this.emoduls.filter(emodul => {
        return emodul.title.toLowerCase().includes(this.search.toLowerCase()) || emodul.dosen.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  },
  methods: {
    retrieveData() {
      this.axios.get('/matakuliah/' + this.$route.params.slug)
      .then((res) => {
        this.matakuliah = res.data.data[0]
        this.emoduls = res.data.data[0].emoduls
      })
    }
  },
  mounted() {
    this.retrieveData();
  }
}
</script>

<style>

</style>