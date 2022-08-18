const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  // devServer: {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   proxy: "https://cors-anywhere.herokuapp.com/",
  // },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
    },
  },
});
