import Vue from "vue";
// import login from "./login.vue";
import App from "./layouts/App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

import "./axios/index";

new Vue({
  router,
  store,
  vuetify,
  // render: h => h(login)
  render: (h) => h(App),
}).$mount("#app");
