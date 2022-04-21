import Vue from "vue";
import Vuex from "vuex";

// Persist user logged in data even though refresh(f5) occurred
// Reference: https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate";
import storePlugins from "@/plugins/storePlugins";

Vue.use(Vuex);
// Use vue-devtools for debugging
Vue.config.devtools = true;

// https://developerjournal.tistory.com/11
import estateStore from "./modules/estateStore";
import userStore from "./modules/userStore";
import likesStore from "./modules/likesStore";
import starsStore from "./modules/starsStore";

const store = new Vuex.Store({
  modules: {
    estateStore: estateStore,
    userStore: userStore,
    likesStore: likesStore,
    starsStore: starsStore,
  },
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
    storePlugins,
  ],
});

export default store;
