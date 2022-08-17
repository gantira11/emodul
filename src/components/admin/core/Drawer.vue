<template>
  <v-navigation-drawer
    app
    class="pt-1"
    v-model="drawer"
    :mini-variant="sideBar"
    color="#21262B"
    dark
    fixed
    permanent
  >
    <v-list-item
      class="justify-center"
      subheader
      two-line
    >
      <v-list-item-content class="d-flex justify-center">
        <v-img src="@/assets/logo_politeknik.png"
          width="45"
          height="45"
          contain
        ></v-img>
      </v-list-item-content>

      <v-list-item-content class="">
        <v-list-item-title class="text-body-1">E-Modul</v-list-item-title>
        <v-list-item-subtitle class="text-overclip">Poltek TEDC</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mx-4 my-2"></v-divider>

    <!-- drawer-header -->
    <v-list-item>
      <v-list-item-avatar>
        <v-icon class="pr-4">md mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-title>
        Hallo, Admin
      </v-list-item-title>
    </v-list-item>
    <!-- !drawer-header -->

    <v-divider class="mx-4"></v-divider>

    <!-- nav-drawer -->
    <v-list dense>
      <v-list-item 
        class="py-1"
        v-for="item in items"
        :key="item.title"
        link
      >
          <router-link :to="{'name': item.route}" class="router-link d-flex">
            <v-list-item-icon>
              <v-icon> {{ item.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content style="color: white">
              <v-list-item-title> {{ item.title }} </v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
    </v-list>
    <!-- !nav-drawer -->

    <v-divider class="mx-4"></v-divider>

    <v-list dense>
      <v-list-item link class="py-1"  @click="logout">
        <v-list-item-icon>
          <v-icon>md mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
  </v-navigation-drawer>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'admin-core-drawer',
  data () {
    return{
      drawer: true,
      mini: true,
      items: [
        { title: 'Dashboard', icon: 'dashboard', route: 'dashboard', },
        { title: 'E-Modul', icon: 'md mdi-book-open-outline', route: 'emoduls' },
        { title: 'User', icon: ' md mdi-account-supervisor', route: 'users' },
        { title: 'Matakuliah', icon: 'md mdi-book-open-page-variant', route: 'matakuliah' },
        { title: 'Program Studi', icon: 'md mdi-chart-arc', route: 'prodi' },
      ]
    }
  },
  computed: {
    ...mapGetters({
      sideBar: 'sideBar',
      user: 'auth/user'
    }),
  },
  methods: {
    ...mapActions({
      setSideBar: 'setSideBar'
    }),

    logout() {
      let dataUser = JSON.parse(localStorage.getItem('dataUser'));
      // console.log('Bearer ' + dataUser.token)
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
  
}
</script>
<style lang="sass">
  .router-link
    text-decoration: none
    color: #fff

</style>