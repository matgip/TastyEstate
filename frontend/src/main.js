import Vue from "vue";
import VueFileAgent from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";

import "@/plugins/mixins";

import "./assets/css/global.css";

Vue.config.productionTip = false;

Vue.use(VueFileAgent);
Vue.use(VueFileAgentStyles);

window.Kakao.init(process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
