const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  // devServer: {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   proxy: "https://cors-anywhere.herokuapp.com/",
  // },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Emodul',
    },
  },
  pwa: {
    manifestOptions: {
      name: 'Emodul Politeknik TEDC',
      short_name: 'Emodul TEDC',
      icons: [
        {
          src: './icons/logo-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: './icons/logo-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          src: './icons/logo-152x152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: './icons/logo-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        }
      ]
    },
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/service-worker.js",
    },
  },
});
