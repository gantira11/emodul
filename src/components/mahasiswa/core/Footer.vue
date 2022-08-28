<template>
  <v-footer
    class="d-xs-block d-sm-none mb-3"
    fixed
  >
    <v-row class="d-flex justify-center">
      <v-card
        height="50"
        max-width="600px"
        width="100%"
        class="white text-center rounded-lg"
      >
        <v-card-text style="padding: 10px" class="d-flex justify-space-around px-9">
          <v-btn
            v-for="item in items"
            :key="item.icon"
            class="mx-4"
            icon
            link
            plain
            :to="{ name: item.route }"
          >
            <v-icon size="24px" class="blue--text">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'mahasiswa-core-footer',
  data() {
    return {
      rounded: true,
      items: [
        { icon: 'md mdi-home', route: 'program-studi' },
        { icon: 'md mdi-bookmark', route: 'bookmark' },
        { icon: 'md mdi-account', route: 'profile' },
      ],
    }
  }
}
</script>

<style scoped>
.footer-bg {
  background-color: red
}
</style>