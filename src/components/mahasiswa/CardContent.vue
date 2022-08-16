<template>
  <v-card>
    <v-img
      src="../../assets/images/card_img.webp"
      height="100"
      contain
    ></v-img>
    <v-card-title class="text-body-2">
      {{ title }}
    </v-card-title>
    <v-card-subtitle class="text--primary text-caption pb-0">
      {{ body}}
    </v-card-subtitle>
    <v-card-actions
      class="d-flex justify-end ma-none"
    >
      <router-link class="apparance-none" :to="route">
        <v-btn
          class="text-caption"
          color="primary"
          text
        >
          {{ btnText }}
        </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardContent',
  props: {
    title: String,
    body: String,
    route: String,
    btnText: String
  }
}
</script>

<style scoped>
.apparance-none {
  text-decoration: none !important;
}
</style>