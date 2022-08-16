<template>
  <v-app>
    <router-view />
    <c-alert />
  </v-app>
  
</template>

<script>
import CAlert from '@/components/CAlert.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  
  components: {
    CAlert
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css');
</style>
