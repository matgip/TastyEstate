import Vue from "vue";
import Vuex from "vuex";

// Persist user logged in data even though refresh(f5) occurred
// Reference: https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: null,
    etate: {},
    user: {},
  },
  getters: {
    getSelectedEstate(state) {
      return state.etate;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    updateSelectedEstate(state, etate) {
      state.etate = etate;
    },
    updateUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
  ],
});
