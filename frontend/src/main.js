import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";

import "./assets/css/global.css";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.Kakao.init(process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY);
