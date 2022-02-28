import Vue from "vue";
import Vuex from "vuex";

// Persist user logged in data even though refresh(f5) occurred
// Reference: https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate";

import api from "@/api/service.js";

Vue.use(Vuex);
// Use vue-devtools for debugging
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    map: null,
    selected: {},
    user: {},
    stars: 0.0,
    likes: 0,
    dialogFlag: false,
  },
  getters: {
    getSelected(state) {
      return state.selected;
    },
    getUser(state) {
      return state.user;
    },
    getStars(state) {
      return state.stars;
    },
    getLikes(state) {
      return state.likes;
    },
    getDialogFlag(state) {
      return state.dialogFlag;
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
    updateDialogFlag(state, dialogFlag) {
      state.dialogFlag = dialogFlag;
    },
  },
  actions: {
    async updateRealEstate(context, selected) {
      try {
        let resp = await api.estates.getRealEstate(selected);
        if (resp.status == 204) {
          // No contents
          await api.estates.setRealEstate(selected);
        }
        context.commit("updateSelected", selected);
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(context, user) {
      try {
        await api.users.setUser(user);
        context.commit("updateUser", user);
      } catch (err) {
        console.log(err);
      }
    },
    async getLikes(context, estateID) {
      if (estateID === undefined) return;
      try {
        const resp = await api.likes.getLikes(estateID);
        context.commit("updateLikes", resp.data.likes);
      } catch (err) {
        console.log(err);
      }
    },
    async updateLikes(context, payLoad) {
      try {
        const resp = await api.likes.addLikes(payLoad.estateID, payLoad.userID);
        if (resp.data.cmd_result === "already-added") {
          alert("이미 좋아요를 누르셨습니다.");
          return;
        }
        context.dispatch("getLikes", payLoad.estateID);
      } catch (err) {
        console.log(err);
      }
    },
  },
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
  ],
});
