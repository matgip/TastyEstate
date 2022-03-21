<template>
  <div>
    <LoginKakaoBtn :method="onClick" :icon="'fas fa-comment'" :button="'카카오 로그인'" />
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
    async onClick() {
      try {
        const user = await this.getUser();
        await this.$store.dispatch("updateUser", user);
        this.$router.push({ path: "/" });
      } catch (err) {
        console.error(err);
        if (err.code === -401) {
          // Unauthorized
          await this.doLogin();
        }
      }
    },
    async doLogin() {
      try {
        const auth = await this.login();
        const payload = {
          token: auth.access_token,
        };
        await this.$api.login.post(payload);
        await this.onClick();
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
