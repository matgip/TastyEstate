<template>
  <div>
    <LoginKakaoBtn :method="onLogin" :icon="'fas fa-comment'" :button="'카카오 로그인'" />
  </div>
</template>

<script>
import LoginKakaoBtn from "./LoginKakaoBtn.vue";

export default {
  data: () => ({
    scope: "profile_nickname, profile_image, account_email, gender",
  }),
  components: {
    LoginKakaoBtn,
  },
  methods: {
    async onLogin() {
      try {
        await this.login();
        const user = await this.getUser();
        this.$store.dispatch("updateUser", user);
        this.$router.push({ path: "/" });
      } catch (err) {
        console.error(err);
      }
    },
    login() {
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
    getUser() {
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
  },
};
</script>
