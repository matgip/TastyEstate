import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: null,
    estateZoom: {},
  },
  getters: {
    estateZoom(state) {
      return state.estateZoom;
    },
  },
  mutations: {
    updateEstateZoom(state, estateZoom) {
      state.estateZoom = estateZoom;
    },
    updateKakaoMap(state, map) {
      state.map = map;
    },
  },
  actions: {},
});
