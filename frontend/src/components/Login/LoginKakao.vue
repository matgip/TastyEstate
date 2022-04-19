<!-- @format -->

<template>
  <div>
    <login-kakao-btn :method="onKakaoLogin" :icon="'fas fa-comment'" :button="'카카오 로그인'" />
  </div>
</template>

<script>
import LoginKakaoBtn from "./LoginKakaoBtn.vue";

export default {
  components: {
    LoginKakaoBtn,
  },

  methods: {
    async onKakaoLogin() {
      localStorage.setItem("redirect_location", "/");
      // await loginController.login("kakao");
      await this.$store.dispatch("login", "kakao");
      this.$router.push({ path: localStorage.getItem("redirect_location") });
    },
  },
};
</script>
