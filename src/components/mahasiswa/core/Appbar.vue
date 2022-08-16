<template>
  <v-app-bar app
    color="blue darken-4 "
    dense
  >
    <v-btn 
      class="d-sm-none"
      icon
      @click="back"
    >
      <v-icon color="white">md mdi-chevron-left</v-icon>
    </v-btn>
    <v-toolbar-title class="white--text">Emodul</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-list 
      class="transparent d-none d-sm-flex px-0 py-0"
      color="#0D47A1"
      max-height="60"
      flat
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        class="white--text font-weight-semibold"
        :to="{name: item.route}"
      >{{ item.title }}</v-list-item>
      
    </v-list>
  </v-app-bar>

</template>

<script>
export default {
  name: 'mahasiswa-core-appbar',
  data () {
    return {
      items: [
        { title: 'Homepage', route: 'program-studi' },
        { title: 'Bookmark', route: 'bookmark' },
        { title: 'Profile', route: 'profile' }
      ]
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>