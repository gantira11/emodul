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
      backendPath: "https://dolphin-app-o4fcf.ondigitalocean.app",
      // backendPath: "http://localhost:8000",
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
    getPdf() {
      
    }
  },
  mounted() {
    // console.log(this.$route.params);
    // console.log(this.beckendPath);
    this.getPdf();
  },
};
</script>

<style></style>
