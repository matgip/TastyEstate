import Vue from "vue";
import Vuex from "vuex";

// Persist user logged in data even though refresh(f5) occurred
// Reference: https://www.npmjs.com/package/vuex-persistedstate
import createPersistedState from "vuex-persistedstate";

import storePlugins from "@/plugins/storePlugins";

Vue.use(Vuex);
// Use vue-devtools for debugging
Vue.config.devtools = true;

const GET_ESTATE = "GET_ESTATE";
const UPDATE_ESTATE = "UPDATE_ESTATE";

const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";

const GET_LIKES = "GET_LIKES";
const UPDATE_LIKES = "UPDATE_LIKES";

const GET_STARS = "GET_STARS";

const GET_DIALOG = "GET_DIALOG";
const UPDATE_DIALOG = "UPDATE_DIALOG";

export default new Vuex.Store({
  state: {
    map: null,
    estate: {},
    user: {},
    stars: 0.0,
    likes: 0,
    dialog: false,
  },
  getters: {
    [GET_ESTATE](state) {
      return state.estate;
    },
    [GET_USER](state) {
      return state.user;
    },
    [GET_STARS](state) {
      return state.stars;
    },
    [GET_LIKES](state) {
      return state.likes;
    },
    [GET_DIALOG](state) {
      return state.dialog;
    },
  },
  mutations: {
    [UPDATE_ESTATE](state, estate) {
      state.estate = estate;
    },
    [UPDATE_USER](state, user) {
      state.user = user;
    },
    [UPDATE_LIKES](state, likes) {
      state.likes = likes;
    },
    [UPDATE_DIALOG](state, dialog) {
      state.dialog = dialog;
    },
  },
  actions: {
    async updateRealEstate({ commit }, estate) {
      let resp = await this.$api.estates.get(estate.id);
      if (resp.status === 204) {
        // No contents
        const post = {
          id: estate.id,
          place_name: estate.place_name,
          phone_number: estate.phone,
        };
        await this.$api.estates.post(post);
        console.log({ message: "Created estate", post: { ...post } });
      }
      commit(UPDATE_ESTATE, estate);
    },
    async updateUser({ commit }, user) {
      const post = {
        id: user.id,
        email: user.kakao_account.email,
        nickname: user.kakao_account.profile.nickname,
      };
      await this.$api.users.post(post);
      console.log({ message: "Created user", post: { ...post } });
      commit(UPDATE_USER, user);
    },
    async getLikes({ commit }, id) {
      const resp = await this.$api.likes.get(id);
      console.log({ message: "Get likes" });
      commit(UPDATE_LIKES, resp.data.likes);
    },
    async updateLikes({ dispatch }, payLoad) {
      const resp = await this.$api.likes.put(payLoad.estateID, { user_id: payLoad.userID });
      if (resp.data.cmd_result === "already-added") {
        alert("이미 좋아요를 누르셨습니다.");
        return;
      }
      dispatch("getLikes", payLoad.estateID);
    },
  },
  plugins: [
    createPersistedState({
      paths: ["user"],
    }),
    storePlugins,
  ],
});
