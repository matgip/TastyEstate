import Vue from "vue";
import Vuex from "vuex";

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
    updateKakaoMap(state, map) {
      state.map = map;
    },
    updateUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
});
