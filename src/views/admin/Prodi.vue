<template>
  <v-container 
    fluid
    class="pa-7 grey lighten-4 content"
  >

    <!-- <div class="mb-5">
      <span class="text-h5">Program Studi</span>
      <v-divider width="10%" class="px-2"></v-divider>
    </div> -->

    <br />

    <v-row
      class="d-flex justify-center"
    >
      <v-card
        class="pa-1"
        width="100%"
      >
        <div
          class="d-flex grow flex-wrap ml-2"
        >
          <v-sheet
            color="#00CAE3"
            min-height="85"
            min-width="85"
            width="auto"
            elevation="6"
            dark
            rounded
            class="d-flex align-center justify-center mt-n5 px-2 py-2 ml-2"
          >
            <v-icon size="40">md mdi-chart-arc</v-icon>
          </v-sheet>
          <p class="text-h5 ml-5 mt-3">Program Studi</p>
        </div>

        <v-card-title class="mt-2">
          <v-btn 
            outlined
            small
            color="black"
            @click="tambahProdi"
          >Tambah data</v-btn>

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

        <v-data-table
          :items-per-page="itemPerPage"
          :search="search"
          :headers="headers"
          :items="prodis"
          no-results-text="Data Tidak Ditemukan"
        >
          <template v-slot:[`item.aksi`]="{ item }">
            <v-icon class="mx-1"
              aria-label="btn-edit"
              color="green"
              @click="updateProdi(item.id)"
            >md mdi-pencil</v-icon>
            <v-icon class="mx-4"
              aria-label="btn-delete"
              color="red"
              @click="deleteProdi(item.id)"
            >md mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>

  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'prodi-view',
  data() {
    return {
      prodis: [],
      search: "",
      itemPerPage: 5,
      headers: [
        { text: 'Jenjang', value: 'jenjang', width: 200 },
        { text: 'Program Studi', value: 'prodi' },
        { text: 'Aksi', align: 'center', value: 'aksi', width: 200 }
      ]
    }
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus',
      setComponent: 'dialog/setComponent',
      setId: 'dialog/setId',
    }),
    retrieveProdi() {
      this.axios.get('/prodi')
      .then((response) => {
        let responses = response.data.data
          this.prodis = responses
        
      }).catch((err) => {
        let error = err.response
        console.log(error)
      })
    },
    tambahProdi() {
      this.setStatusDialog(true),
      this.setComponent('TambahProdi')
    },
    updateProdi(id) {
      this.setStatusDialog(true)
      this.setComponent('UpdateProdi')
      this.setId(id)
      this.$root.$emit('update-prodi')
    },
    deleteProdi(id) {
      this.setStatusDialog(true)
      this.setComponent('DeleteProdi')
      this.setId(id)
    },
  },
  mounted() {
    this.retrieveProdi();
    this.$root.$on('prodi-view', () => {
      // this.retrieveProdi();
      this.$router.go(0)
    })
  },
}
</script>
<style lang="">
  
</style>