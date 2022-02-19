<template>
  <div>
    <LoginKakaoBtn :method="onLogin" :icon="'fas fa-comment'" :button="'카카오 로그인'" />
  </div>
</template>

<script>
import api from "@/api/service.js";
import store from "@/store";
import LoginKakaoBtn from "./LoginKakaoBtn.vue";

export default {
  data: () => ({
    scope: "profile_nickname, profile_image, account_email, gender",
  }),
  components: {
    LoginKakaoBtn,
  },
  methods: {
    onLogin() {
      this.loginKakao()
        .then(() => {
          return this.getUserKakao();
        })
        .then((user) => {
          store.commit("updateUser", user);
          return user;
        })
        .then((user) => {
          this.setUserDB(user);
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    loginKakao() {
      return new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          scope: this.scope,
          success(authObj) {
            resolve(authObj);
          },
          fail(err) {
            reject(err);
          },
        });
      });
    },
    getUserKakao() {
      return new Promise((resolve, reject) => {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success(user) {
            resolve(user);
          },
          fail(err) {
            reject(err);
          },
        });
      });
    },
    async setUserDB(user) {
      return await api.users.setUser(user);
    },
  },
};
</script>
