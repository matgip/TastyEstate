import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: null,
    etate: {},
  },
  getters: {
    getSelectedEstate(state) {
      return state.etate;
    },
  },
  mutations: {
    updateSelectedEstate(state, etate) {
      state.etate = etate;
    },
    updateKakaoMap(state, map) {
      state.map = map;
    },
  },
  actions: {},
});
