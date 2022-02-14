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
          id: this.getID(user),
          email: this.getEmail(user),
          nickname: this.getNickname(user),
        })
        .then(function(res) {
          console.log(res);
        });
    },
    updateUser(user) {
      store.commit("updateUser", this.getAccount(user));
    },
    getID(user) {
      return user.id;
    },
    getEmail(user) {
      return user.kakao_account.email;
    },
    getNickname(user) {
      return user.kakao_account.profile.nickname;
    },
    getAccount(user) {
      return user.kakao_account;
    },
  },
};
</script>
