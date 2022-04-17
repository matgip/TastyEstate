const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";

import { socialLoginApi, logoutApi, fetchMeApi } from "../../api/login/api"
import kakaoLogin from "../../api/login/kakao";

const userStore = {
  state: {
    user: localStorage.getItem("user"),
  },
  getters: {
    [GET_USER](state) {
      return state.user;
    },
  },
  mutations: {
    [UPDATE_USER](state, user) {
      state.user = user;
      if (user == null)
        localStorage.removeItem("user");
      else
        localStorage.setItem("user", user);
    },
  },
  actions: {
    async login({ commit }, social) {
      let accessToken;
      try {
        if (social === "kakao") {
          accessToken = await kakaoLogin.login();
          localStorage.setItem("social", social);
        }
      } catch (err) {
        alert("Login Failed. Check Social connection");
        return;
      }

      try {
        const user = await socialLoginApi(social, accessToken);
        commit(UPDATE_USER, user);

        localStorage.setItem("social", social);
      } catch (err) {
        alert("Login Failed. Check server connection");
      }
    },

    async logout({ commit }) {
      const social = localStorage.getItem("social");
      let accessToken;
      if (social === "kakao") {
        accessToken = window.Kakao.Auth.getAccessToken();
      }
      try {
        await logoutApi(social, accessToken);
      } catch (err) {
        alert("Logout Failed. Check server connection");
      } finally {
        commit("UPDATE_USER", null);
        localStorage.removeItem("social");
      }
    },

    async fetchUser({ commit }) {
      console.log("fetchUser");
      const social = localStorage.getItem("social");
      console.log("social", social);
      if (social == null) {
        return;
      }
      try {
        const user = await fetchMeApi();
        commit(UPDATE_USER, user);
      } catch (err) {
        alert("Session expried. Please login again");
        localStorage.removeItem("social");
        commit(UPDATE_USER, null);
      }
    }
  },
};

export default userStore;
