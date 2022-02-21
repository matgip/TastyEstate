import Vue from "vue";
import Vuex from "vuex";

// Persist user logged in data even though refresh(f5) occurred
// Reference: https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: null,
    selected: {},
    user: {},
    rating: 0.0,
    likes: 0,
  },
  getters: {
    getSelected(state) {
      return state.selected;
    },
    getUser(state) {
      return state.user;
    },
    getRating(state) {
      return state.rating;
    },
    getLikes(state) {
      return state.likes;
    },
  },
  mutations: {
    updateSelected(state, selected) {
      state.selected = selected;
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateLikes(state, likes) {
      state.likes = likes;
    },
  },
  actions: {},
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
  ],
});
