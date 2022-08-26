<template>
  <v-container 
    class="my-4 d-flex justify-center flex-column"
  >
    <v-card 
      class="px-4 py-3 mb-5"
    >
      <v-row 
        class="d-flex align-baseline justify-space-between pa-3"
      >
        <h1 class="text-h6 font-weight-regular mb-3">Program Studi</h1>
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
          v-for="prodi in filteredList"
          :key="prodi.id"
          cols="12"
          sm="6"
          md="6"
          lg="4"
        >
          <CardContent 
            :title="prodi.prodi" 
            :image="prodi.image != null ? `${beUrl}/storage/images/${prodi.image}` : `${beUrl}/storage/images/defaultBanner.webp`"
            :body="`Jenjang ` + prodi.jenjang" 
            :route="`program-studi/${prodi.slug}/`" 
            btnText="Lihat semua matakuliah"
          />
        </v-col>
      </v-row>
    </v-card>
    
  </v-container>
</template>

<script> 
import CardContent from '@/components/mahasiswa/CardContent.vue'

export default {
  name: 'homepage-view',
  data() {
    return {
      search: '',
      prodis: [],
      beUrl: process.env.VUE_APP_BACKEND,
    }
  },
  components: {
    CardContent
  },
  computed: {
    filteredList() {
      return this.prodis.filter(prodi => {
        return prodi.prodi.toLowerCase().includes(this.search.toLowerCase()) || prodi.jenjang.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  },
  methods: {
    retrieveProdi() {
      this.axios.get('/prodi')
      .then((res) => {
        this.prodis = res.data.data
      })
      .catch((err) => {
        console.error(err)
      })
    },
  },
  mounted() {
    this.retrieveProdi()
  }
}
</script>

<style>

</style>