<template lang="">
  <v-card class="px-3 py-5">
      <v-row class="d-flex justify-space-between align-center">
        <v-col  cols="9" sm="10" md="10" lg="10" >
          <v-card-title>
            Tambah User
          </v-card-title>
        </v-col>
        <v-col class="ml-9">
          <v-icon class="justify-end"
            size="25"
            @click="close"
          >
            md mdi-close-circle-outline
          </v-icon>
        </v-col>
      </v-row>
      <v-container class="mt-4">
        <v-form ref="form" lazy-validation>
          <v-row class="mb-n4">
            <v-col cols="5">
              <v-text-field
                class="text-body-2"
                dense
                v-model="nomor_induk"
                :rules="niRules"
                label="NIM"
                color="grey darken-2"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="7">
              <v-text-field
                class="text-body-2"
                dense
                v-model="nama_lengkap"
                :rules="nlRules"
                label="Nama Lengkap"
                color="grey darken-2"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
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
            type="password"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-combobox
                v-model="selectProdi"
                label="Program Studi"
                dense
                outlined
                :items="prodis"
                :rules="prodiRules"
                item-value="id"
                item-text="prodi" 
              >
              </v-combobox>
            </v-col>
            <v-col>
              <v-combobox
                v-model="selectRole"
                label="Role"
                dense
                outlined
                :items="roles"
                :rules="prodiRules"
                item-value="id"
                item-text="role" 
              >
              </v-combobox>
            </v-col>
          </v-row>
          <div class="d-flex justify-end">
            <v-btn
              class="justify-end text-body-2"
              color="black darken-1"
              outlined
              dark
              @click="submit"
            >Tambah</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'TambahUser',
  data () {
    return {
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
          'prodi_id': this.selectProdi.id,
          'role_id': this.selectRole.id
        }
  
        this.axios.post('/users', formData)
        .then((response) => {
          let responses = response.data
          if(responses) {
            this.setAlert({
              status: true,
              text: responses.message,
              type: 'success'
            })
            this.$router.go(0)

            // this.close()
            // this.$root.$emit('user-view')
          }
        })
        .catch((err) => {
          let error = err.response
          console.log(error)
        })
      }
    },
    retrieveProdi() {
      this.axios.get('/prodi')
      .then((response) => {
        let responses = response.data.data
        this.prodis = responses
      })
      .catch((err) => {
        let error = err.response
        console.log(error)
      })
    },
  },
  mounted() {
    this.retrieveProdi()
  },
}
</script>
<style lang="">
  
</style>