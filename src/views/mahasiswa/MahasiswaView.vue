<template>
  <v-app class="grey lighten-4">
    <!-- Appbar -->
    <mahasiswa-core-appbar />
    <!-- !Appbar -->
    <mahasiswa-core-view />

    <v-dialog v-model="dialog" persistent max-width="600px">
      <component :is="currentComponent"></component>
    </v-dialog>

    <mahasiswa-core-footer />
  </v-app>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';


import MahasiswaCoreAppbar from "../../components/mahasiswa/core/Appbar.vue";
import MahasiswaCoreFooter from "../../components/mahasiswa/core/Footer.vue";
import MahasiswaCoreView from "../../components/mahasiswa/core/View.vue";

import UpdateProfile from "../../components/mahasiswa/UpdateProfile.vue"

export default {
  name: "MahasiswaView",
  components: {
    MahasiswaCoreAppbar,
    MahasiswaCoreFooter,
    MahasiswaCoreView,
    UpdateProfile
    // MahasiswaCoreAppbar: () => import()
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
};
</script>

<style></style>
