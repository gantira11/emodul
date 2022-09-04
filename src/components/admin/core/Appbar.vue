<template>
	<v-app-bar app
    elevation="0"
  >
    <v-btn
      aria-label="burgerbar-btn"
      class="barBtn ml-1"
      elevation="2"
      icon
      @click="setSideBar(!sideBar)"
    >
      <v-icon>{{sideBar ? 'md mdi-menu' : 'md mdi-chevron-left'}}</v-icon>
    </v-btn>

	</v-app-bar>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'admin-core-appbar',
	computed: {
    ...mapGetters({
      sideBar: 'sideBar'
    })
  },
  methods: {
    ...mapActions({
      setSideBar: 'setSideBar'
    })
  },
}
</script>
<style lang="sass">
.barBtn
  width: 40px !important
  height: 40px !important
  background-color: #fff
</style>