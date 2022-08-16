<template lang="">
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
          <p class="text-h5 ml-5 mt-3">Emoduls</p>
        </div>

        <v-card-title class="mt-2">
          <v-btn 
            outlined
            small
            color="black"
            @click="tambahEmodul"
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
          :items="emoduls"
          no-results-text="Data Tidak Ditemukan"
        >
          <template v-slot:[`item.matakuliah`]="{ item }">
            {{ item.matakuliahs.matakuliah }}
          </template>
          <template v-slot:[`item.prodi`]="{ item }">
            {{ item.prodis.prodi }}
          </template>
          <template v-slot:[`item.emodul`]="{ item }">
            {{ item.modules.length }}
          </template>
          <template v-slot:[`item.aksi`]="{ item }">
            <v-icon class="mx-4"
              aria-label="btn-delete"
              color="red"
              @click="deleteEmodul(item.id)"
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
  name: 'emodul-view',
  data() {
    return {
      search: '',
      itemPerPage: 5,
      emoduls: [],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Deskripsi', value: 'deskripsi' },
        { text: 'Dosen', value: 'dosen' },
        { text: 'Matakuliah', value: 'matakuliah' },
        { text: 'Program Studi', value: 'prodi' },
        { text: 'Total Emodul', value: 'emodul' },
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
    retrieveEmodul() {
      this.axios.get('/emodul')
      .then((res) => {
        let response = res.data.data
        this.emoduls = response
      })
      .catch((err) => {
        let error = err.response
        console.log(error)
      })
    },
    tambahEmodul() {
      this.setStatusDialog(true),
      this.setComponent('TambahEmodul')
    },
    deleteEmodul(id) {
      this.setStatusDialog(true),
      this.setComponent('DeleteEmodul')
      this.setId(id)
    }
  },
  mounted() {
    this.retrieveEmodul()
    this.$root.$on('emodul-view', () => {
      this.retrieveEmodul()
    })
  }
}
</script>
<style lang="">
  
</style>