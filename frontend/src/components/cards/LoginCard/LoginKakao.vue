<template>
  <div>
    <BaseButton
      :btn-props="vuetifyLoginButton"
      :icon-props="vuetifyIcon"
      :icon="'fas fa-comment'"
      :on-click="handleKakaoLogin"
      :button="'카카오 로그인'"
    />
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },

  data: () => ({
    vuetifyLoginButton: {
      color: "yellow lighten-1",
    },
    vuetifyIcon: {
      left: true,
    },
  }),

  props: {
    onLoginSuccessHandler: {
      type: Function,
      required: true,
      validator: function(func) {
        return func !== null;
      },
    },
  },

  methods: {
    async handleKakaoLogin() {
      // localStorage.setItem("redirect_location", "/");
      // await loginController.login("kakao");
      await this.$store.dispatch("login", "kakao");
      this.onLoginSuccessHandler();
      // this.$router.push({ path: localStorage.getItem("redirect_location") });
    },
  },
};
</script>

<style scoped>
.v-btn {
  width: 400px;
}

@media screen and (max-width: 768px) {
  .v-btn {
    width: 300px;
  }
}
</style>
