<template>
  <div>
    <LoginKakaoBtn :method="onLogin" :icon="'fas fa-comment'" :button="'카카오 로그인'" />
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";
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
          self.updateUser(user);
        },
        fail: function(err) {
          console.log(err);
        },
      });
    },
    setUserDB(user) {
      axios
        .post("/api/users", {
          id: user.id,
          email: user.kakao_account.email,
          nickname: user.kakao_account.profile.nickname,
        })
        .then(function(res) {
          console.log(res);
        });
    },
    updateUser(user) {
      store.commit("updateUser", user.kakao_account);
    },
  },
};
</script>
