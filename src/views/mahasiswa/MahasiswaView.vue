<template>
  <v-app class="grey lighten-4">
    <!-- Appbar -->
    <mahasiswa-core-appbar />
    <!-- !Appbar -->
    <mahasiswa-core-view />

    <mahasiswa-core-footer />
  </v-app>
</template>

<script>
import MahasiswaCoreAppbar from '../../components/mahasiswa/core/Appbar.vue'
import MahasiswaCoreFooter from '../../components/mahasiswa/core/Footer.vue'
import MahasiswaCoreView from '../../components/mahasiswa/core/View.vue'

export default {
  name: 'MahasiswaView',
  components: {
    MahasiswaCoreAppbar,
    MahasiswaCoreFooter,
    MahasiswaCoreView
    // MahasiswaCoreAppbar: () => import()

  }
  
}
</script>

<style>

</style>