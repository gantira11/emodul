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
            color="#E91E63"
            min-height="85"
            min-width="85"
            width="auto"
            elevation="6"
            dark
            rounded
            class="d-flex align-center justify-center mt-n5 px-2 py-2 ml-2"
          >
            <v-icon size="40">md mdi-account</v-icon>
          </v-sheet>
          <p class="text-h5 ml-5 mt-3">Users</p>
        </div>

        <v-card-title class="mt-2">
          <v-btn 
            outlined
            small
            color="black"
            @click="tambahUser"
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
          :items="mahasiswas"
          no-results-text="Data Tidak Ditemukan"
        >
          <template v-slot:[`item.prodi`]="{ item }">
            {{ item.prodi.prodi }}
          </template>
          <template v-slot:[`item.role`]="{ item }">
            {{ item.role.role }}
          </template>
          <template v-slot:[`item.aksi`]="{ item }">
            <v-icon class="mx-1"
              aria-label="btn-edit"
              color="green"
              @click="updateUser(item.id)"
            >md mdi-pencil</v-icon>
            <v-icon class="mx-2"
              aria-label="btn-delete"
              color="red"
              @click="deleteUser(item.id)"
            >md mdi-delete</v-icon>
            <v-icon class="mx-1"
              aria-label="btn-delete"
              color="blue"
              @click="resetPassword(item.id)"
            >md mdi-backup-restore</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'user-view',
  data() {
    return {
      prodi: 'asd',
      itemPerPage: 5,
      search: '',
      mahasiswas: [],
      headers: [
        { text: 'Nomor Induk', value: 'nomor_induk' },
        { text: 'Nama Lengkap', value: 'nama_lengkap' },
        { text: 'Username', value: 'username' },
        { text: 'Prodi', value: 'prodi', sortable: false },
        { text: 'Role', value: 'role', sortable: false },
        { text: 'Aksi', align: 'center', value: 'aksi', sortable: false, width: 200 }
      ],
    }
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus',
      setComponent: 'dialog/setComponent',
      setId: 'dialog/setId'
    }),
    retrieveMahasiswa() {
      this.axios.get('/users')
      .then((response) => {
        let responses = response.data.data
        this.mahasiswas = responses
      })
      .catch((err) => {
        let error = err.response
        console.log(error)
      })
    },
    tambahUser() {
      this.setStatusDialog(true),
      this.setComponent('TambahUser')
    },
    updateUser(id) {
      this.setStatusDialog(true),
      this.setComponent('UpdateUser'),
      this.setId(id)
      this.$root.$emit('update-users')
    },
    deleteUser(id) {
      this.setStatusDialog(true),
      this.setComponent('DeleteUser'),
      this.setId(id)
    },
    resetPassword(id) {
      this.setStatusDialog(true),
      this.setComponent('ResetPassword'),
      this.setId(id)
    }
  },
  mounted() {
    this.retrieveMahasiswa()
    this.$root.$on('user-view', () => {
      this.retrieveMahasiswa()
      this.$router.go(0)
    })
  },
}
</script>
<style lang="">
  
</style>