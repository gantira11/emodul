<template>
  <v-card class="px-3 py-5">
    <v-row class="d-flex justify-space-between align-center">
      <v-col cols="9" sm="10" md="10" lg="10">
        <v-card-title> Update Profile </v-card-title>
      </v-col>
      <v-col class="ml-9">
        <v-icon class="justify-end" size="25" @click="close">
          md mdi-close-circle-outline
        </v-icon>
      </v-col>
    </v-row>
    <v-container class="mt-4">
      <v-form ref="form" lazy-validation>
        <v-text-field
          class="text-body-2"
          dense
          v-model="username"
          :rules="usernameRules"
          label="Username"
          color="grey darken-2"
          outlined
        ></v-text-field>
        <v-text-field
          class="text-body-2"
          dense
          v-model="password"
          :rules="passwordRules"
          label="Password"
          color="grey darken-2"
          outlined
          :type="!showPassword ? 'password' : 'text'"
        >
          <template v-slot:append>
            <v-icon @click="showPassword = !showPassword">{{!showPassword ? 'md visibility' : 'md visibility_off'}}</v-icon>
          </template>
        </v-text-field>

        <div class="d-flex justify-end">
          <v-btn
            class="justify-end text-body-2"
            color="black darken-1"
            outlined
            dark
            @click="submit"
            >Update</v-btn
          >
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UpdateProfile',
  data() {
    return {
      showPassword: false,
      nomor_induk: '',
      nama_lengkap: '',
      username: '',
      password: '',
      selectProdi: '',
      selectRole: '',
      prodis: [],
      roles: [
        {id: 1, role: 'Admin'},
        {id: 2, role: 'Mahasiswa'}
      ],
      // Validations
      niRules: [
        v => !!v || 'Nomor Induk harus diisi',
      ],
      nlRules: [
        v => !!v || 'Nama Lengkap harus diisi',
      ],
      usernameRules: [
        v => !!v || 'Username harus diisi',
      ],
      passwordRules: [
        v => !!v || 'Password harus diisi',
      ],
      prodiRules: [
        v => !!v || 'Prodi harus diisi'
      ],
      roleRules: [
        v => !!v || 'Role harus diisi'
      ]
    }
  },
  computed: {
    ...mapGetters({
      id: 'dialog/id'
    })
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus',
      setAlert: 'alert/set'
    }),
    close() {
      this.setStatusDialog(false);
    },
    submit() { 
      if(this.$refs.form.validate()) {

        let formData = {
          'nomor_induk': this.nomor_induk,
          'nama_lengkap': this.nama_lengkap,
          'username': this.username,
          'password': this.password,
          'prodi_id': this.selectProdi,
          'role_id': this.selectRole
        }
  
        this.axios.put('/users/' + this.id, formData)
        .then((response) => {
          console.log(response)
          let responses = response.data
          if(responses) {
            this.setAlert({
              status: true,
              text: 'Profile berhasil di Update',
              type: 'success'
            })
            this.close()
            this.$router.go(0)
          }
        })
        .catch((err) => {
          let error = err.response
          console.log(error)
        })
      }
    },
    retrieveData(){
      this.axios.get('/users/' + this.id)
      .then((res) => {
        const response = res.data.data
        this.nomor_induk = response[0].nomor_induk,
        this.nama_lengkap = response[0].nama_lengkap,
        this.username = response[0].username
        this.selectProdi = response[0].prodi_id,
        this.selectRole = response[0].role_id
      })
    },
  },
  mounted() {
    this.retrieveData()
    this.$root.$on('update-profile', () => {
      this.retrieveData()
    })
  },
};
</script>

<style></style>
