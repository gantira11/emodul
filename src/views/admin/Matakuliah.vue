<template lang="">
  <v-container 
    fluid
    class="pa-7 grey lighten-4 content"
  >
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
            color="#4CAF50"
            min-height="85"
            min-width="85"
            width="auto"
            elevation="6"
            dark
            rounded
            class="d-flex align-center justify-center mt-n5 px-2 py-2 ml-2"
          >
            <v-icon size="40">md mdi-book-open-page-variant</v-icon>
          </v-sheet>
          <p class="text-h5 ml-5 mt-3">Matakuliah</p>
        </div>

        <v-card-title class="mt-2">
          <v-btn 
            outlined
            small
            color="black"
            @click="tambahMatkul"
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
          :items="matkuls"
          no-results-text="Data Tidak Ditemukan"
        >
          <template v-slot:[`item.prodi`]="{ item }">
            {{ item.prodis.prodi }}
          </template>
          <template v-slot:[`item.aksi`]="{ item }">
            <v-icon class="mx-1"
              aria-label="btn-edit"
              color="green"
              @click="updateMatkul(item.id)"
            >md mdi-pencil</v-icon>
            <v-icon class="mx-4"
              aria-label="btn-delete"
              color="red"
              @click="deleteMatkul(item.id)"
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
  name: 'matakuliah-view',
  data() {
    return {
      matkuls: [],
      search: '',
      itemPerPage: 5,
      headers: [
        { text: 'Kode', value: 'kode' },
        { text: 'Matakuliah', value: 'matakuliah' },
        { text: 'Program Studi', value: 'prodi' },
        { text: 'Aksi', align: 'center', value: 'aksi', width: 200 }
      ]
    }
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus',
      setComponent: 'dialog/setComponent',
      setId: 'dialog/setId'
    }),
    retrieveMatkul() {
      this.axios.get('/matakuliah')
      .then((response) => {
        let responses = response.data.data
        this.matkuls = responses
      })
      .catch((err) => {
        let responses_err = err.response
        console.log(responses_err)
      })
    },
    tambahMatkul() {
      this.setStatusDialog(true)
      this.setComponent('TambahMatakuliah')
    },
    updateMatkul(id) {
      this.setStatusDialog(true),
      this.setComponent('UpdateMatakuliah')
      this.setId(id)
      this.$root.$emit('update-matkul')
    },
    deleteMatkul(id) {
      this.setStatusDialog(true),
      this.setComponent('DeleteMatakuliah')
      this.setId(id)
    }
  },
  mounted() {
    this.retrieveMatkul()
    this.$root.$on('matakuliah-view', () => {
      this.retrieveMatkul()
    })
  }
}
</script>
<style lang="">
  
</style>