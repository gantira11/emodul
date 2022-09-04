<template>
  <div>
    <vue-pdf-app
      style="height: 100vh"
      :pdf="`${backendPath}/storage/emoduls/${$route.params.slug}`"
      @open="openHandler"
    ></vue-pdf-app>
  </div>
</template>

<script>
import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

export default {
  name: "ViewModule",
  data() {
    return {
      backendPath: process.env.VUE_APP_BACKEND,
      modulePath: "",
    };
  },
  components: {
    VuePdfApp,
  },
  methods: {
    openHandler(pdfApp) {
      window._pdfApp = pdfApp;
    },
  },
  mounted() {
    this.getPdf();
  },
};
</script>

<style>

</style>
