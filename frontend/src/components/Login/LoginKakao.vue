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
      const self = this;
      window.Kakao.Auth.login({
        scope: self.scope,
        success: function(authObj) {
          console.log(authObj);
          self.getUser();
          self.$router.push({ path: "/" });
        },
        fail: function(err) {
          console.log(err);
        },
      });
    },
    getUser() {
      const self = this;
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function(user) {
          self.setUserDB(user);
          self.setUser(user);
        },
        fail: function(err) {
          console.log(err);
        },
      });
    },
    async setUserDB(user) {
      const resp = await api.users.setUser(user);
      console.log(resp);
    },
    setUser(user) {
      store.commit("updateUser", this.getAccount(user));
    },
    getAccount(user) {
      return user.kakao_account;
    },
  },
};
</script>
