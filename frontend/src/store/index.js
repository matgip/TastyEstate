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
import agencyStore from "./modules/agencyStore";
import userStore from "./modules/userStore";
import mapStore from "./modules/mapStore";
import loginVisibleFlagStore from "./modules/loginVisibleFlagStore";

const store = new Vuex.Store({
  modules: {
    agencyStore: agencyStore,
    userStore: userStore,
    mapStore: mapStore,
    loginVisibleFlagStore: loginVisibleFlagStore,
  },
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
    storePlugins,
  ],
});

export default store;
