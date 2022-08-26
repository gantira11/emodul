<template>
  <div>
      <vue-pdf-app
        style="height: 91vh"
        :pdf="`${beUrl}/storage/emoduls/${$route.params.slug}`"
        @open="openHandler"
      ></vue-pdf-app>
  </div>
</template>

<script>
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

export default {
  name: "ModuleView",
  data() {
    return {
      beUrl: process.env.VUE_APP_BACKEND,
    };
  },
  components: {
    VuePdfApp,
  },
  methods: {
    openHandler(pdfApp) {
      window._pdfApp = pdfApp;
    },
    getPdf() {},
  },
  mounted() {
    // console.log(this.$route.params);
    // console.log(this.beckendPath);
    this.getPdf();
  },
};
</script>

<style></style>
