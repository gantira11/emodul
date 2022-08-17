import { defineConfig } from "@vue/cli-service";
export default defineConfig({
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: "https://dolphin-app-o4fcf.ondigitalocean.app",
    },
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
    },
  },
});
