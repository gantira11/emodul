import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/axios";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { SchemaSyncHandler } from "./schemasync";

Vue.config.productionTip = false;

SchemaSyncHandler.sync();

// navigator.serviceWorker.onmessage = event => {
// 	const message = JSON.parse(event.data);
//   console.log(message)
// 	// if(message && message.type.includes("/api/users")){
// 	// 	console.log("List of attendees to date", message.data)
// 	// 	renderAttendees(message.data)
// 	// }
// }


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
