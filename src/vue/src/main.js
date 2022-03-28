import Vue from "vue";
import App from "./App.vue";
import i18n from "./i18n.js";
import router from "./router/router.js";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
