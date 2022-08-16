<template>
  <v-app class="grey lighten-4">
    <admin-core-appbar />
    
    <v-row no-gutters>

      <admin-core-drawer />

      <v-col>
        <admin-core-view />
      </v-col>

    </v-row>

    <!-- <keep-alive> -->
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <component :is="currentComponent"></component>
      </v-dialog>
    <!-- </keep-alive> -->
    
    

  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

// Core
import AdminCoreAppbar from '../../components/admin/core/Appbar.vue'
import AdminCoreDrawer from '../../components/admin/core/Drawer.vue'
import AdminCoreView from '../../components/admin/core/View.vue'

// Prodi Modal
import TambahProdi from '../../components/admin/TambahProdi.vue'
import UpdateProdi from '../../components/admin/UpdateProdi.vue'
import DeleteProdi from '../../components/admin/DeleteProdi.vue'
//Matakuliah Modal
import TambahMatakuliah from '../../components/admin/TambahMatakuliah.vue'
import UpdateMatakuliah from '../../components/admin/UpdateMatakuliah.vue'
import DeleteMatakuliah from '../../components/admin/DeleteMatakuliah.vue'
// User Modal
import TambahUser from '../../components/admin/TambahUser.vue'
import UpdateUser from '../../components/admin/UpdateUser.vue'
import DeleteUser from '../../components/admin/DeleteUser.vue'
import ResetPassword from '../../components/admin/ResetPassword.vue'
// Emodul Modal
import TambahEmodul from '../../components/admin/TambahEmodul.vue'
import DeleteEmodul from '../../components/admin/DeleteEmodul.vue'

export default {
  name: 'AdminView',
  components: {
    AdminCoreAppbar,
    AdminCoreDrawer,
    AdminCoreView,
    
    // Prodi Modal
    TambahProdi,
    UpdateProdi,
    DeleteProdi,
    // Matakuliah Modal
    TambahMatakuliah,
    UpdateMatakuliah,
    DeleteMatakuliah,
    // User Modal
    TambahUser,
    UpdateUser,
    DeleteUser,
    ResetPassword,
    // Emodul
    TambahEmodul,
    DeleteEmodul
  },


  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus'
    })
  },

  computed: {
    ...mapGetters({
      statusDialog: 'dialog/status',
      currentComponent: 'dialog/component'
    }),
    dialog: {
      get() {
        return this.statusDialog
      },
      set(value) {
        this.setStatusDialog(value)
      }
    }
  }
}
</script>
<style lang="sass">
  $body-font-family: Arial, Helvetica, sans-serif
</style>