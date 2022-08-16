<template>
  <v-container
    class="my-4 d-flex justify-center flex-column"
  >
    <v-card class="px-4 py-3 mb-5">
      <v-row 
        class="d-flex align-baseline justify-space-between pa-3"
      >
        <h1 class="text-h5 font-weight-regular mb-3">Profile</h1>
        <v-btn
          class="white--text"
          color="blue darken-4"
          icon
        >
          <v-icon>md mdi-pencil</v-icon>
        </v-btn>
      </v-row>
      <v-divider></v-divider> <br />
      <v-row class="px-2 d-flex align-center justify-center">
        <v-col class="d-flex justify-center"
          cols="12"
          sm="3"
          md="2"
        >
          <v-avatar
            width="80"
            height="80"
            color="grey lighten-3"
          >
            <v-img
              src="../../assets/logo.svg"
              height="100"
              cover
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col class="d-flex flex-column justify-start align-center align-sm-start">
          <p class="text-body-1 font-weight-bold">{{ this.user.nomor_induk }}</p>
          <h1 class="text-body-2 font-weight-semibold">{{ this.user.nama_lengkap }}</h1>
          <p class="text-body-2 font-weight-semibold">{{ this.prodi.jenjang }} | {{ this.prodi.prodi }}</p>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center"
          cols="12"
          sm="4"
        >
          <v-btn
            class="white--text"
            color="blue darken-4"
            block
            @click="logout"
          >
            Logout
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileView',
  data () {
    return {
      user: [],
      prodi: [],
    }
  },
  methods: {
    retrieveData() {
      let userData = JSON.parse(localStorage.getItem('dataUser'));
      this.axios.get('/users/' + userData.user.id)
      .then((res) => {
        this.user = res.data.data[0]
        this.prodi = res.data.data[0].prodi
      })
      .catch((err) => {
        console.error(err)
      })
    },
    logout() {
      let dataUser = JSON.parse(localStorage.getItem('dataUser'));
      let config = {
        headers: {
          'Authorization': 'Bearer ' + dataUser.token
        }
      }
      this.axios.post('/logout', {}, config)
      .then((res) => {
        const response = res.data.message
        console.log(response)
        if(response) {
          localStorage.removeItem('dataUser');
          this.$router.push({name: 'login'})
        }
      })
    }
  },
  mounted() {
    this.retrieveData()
  }
}
</script>

<style>

</style>