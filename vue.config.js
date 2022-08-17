import { defineConfig } from "@vue/cli-service";
export default defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: 'https://dolphin-app-o4fcf.ondigitalocean.app'
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
    },
  },
});
