<template>
  <v-app>
    <v-container class="fill-height background font-content" fluid>
      <v-row class="justify-center">
        <v-col
          lg="4"
          md="6"
          sm="7"
        >
          <v-card class="py-3 pt-5"
            elevation="3"
          >
            <div class="header-form d-flex justify-center align-center px-4">
              <div class="logo mr-5"></div>
              <div class="ml-2">
                <span>E-Modul</span> <br />
                <span>Politeknik TEDC Bandung</span>
              </div>
            </div>

            <v-card-title class="pb-0 pt-5 mt-3 text-body-1">
              Selamat Datang
            </v-card-title>
            <v-card-text class="text-body-2">
              Sign-in untuk melanjutkan
            </v-card-text>

            <v-form class="px-3" ref="form">
              <v-text-field class="text-body-2"
                v-model="username"
                dense
                outlined
                label="Username"
                color="black"
                :rules="usernameRules"
              >
                <template v-slot:append>
                  <v-icon size="">md mdi-account</v-icon>
                </template>
              </v-text-field>
              <v-text-field class="text-body-2"
                v-model="password"
                dense
                outlined
                label="Password"
                color="black"
                :rules="passwordRules"
                :type="!showPassword ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <v-icon @click="showPassword = !showPassword">{{!showPassword ? 'md visibility' : 'md visibility_off'}}</v-icon>
                </template>
              </v-text-field>
              <v-btn
                color="primary"
                block
                elevation="2"
                @click="submit"
              >Sign In</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'login-view',
  
  data () {
    return {
      showPassword: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      setAuth: 'auth/set',
      setAlert: 'alert/set'
    }),
    submit() {
      if (this.$refs.form.validate()) {
        let formData = {
          'username': this.username,
          'password': this.password
        }
        this.axios.post('/login', formData)
        .then((response) => {
          let responses = response.data
          this.setAuth(responses)
          localStorage.setItem('dataUser', JSON.stringify(this.user))
          
          if(this.user.user.id > 0) {
            this.setAlert({
              status: true,
              text: 'Berhasil Login',
              type: 'success'
            })
            if(this.user.user.role.role === 'Admin') {
              this.$router.push({name: 'dashboard'})
            } else {
              this.$router.push({name: 'program-studi'})
            }
            
          }
        })
        .catch((err) => {
          let error = err.response.data.message
          this.setAlert({
            status: true,
            text: error,
            type: 'error'
          })
        })
      }
    }
  },
  mounted() {
    const authUser = JSON.parse(localStorage.getItem('dataUser'));
    if(authUser != null) {
      if(authUser.user.role.role === 'Admin') {
        this.$router.push({name: 'dashboard'})
      } else {
        this.$router.push({name: 'program-studi'})
      }
    }
  }
}
</script>
<style lang="sass">

.font-content
  font-family: Arial, Helvetica, sans-serif

.background
  background: url( '../assets/images/background-login.svg') no-repeat center center
  background-size: cover
  background-color: #F2F5F8

.header-form 
  width: 100%
  height: 50px

.logo 
  width: 50px
  height: 50px
  background: url('../assets/logo.svg') no-repeat center center
  background-size: contain
  background-position: absolute
</style>