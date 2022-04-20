<!-- @format -->

<template>
  <div>
    <base-button
      :btn-props="btnProps"
      :icon-props="iconProps"
      :icon="'fas fa-comment'"
      :onClick="onKakaoLogin"
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
    // Vuetify CSS Style & Props
    btnProps: {
      color: "yellow lighten-1",
    },
    iconProps: {
      left: true,
    },
  }),

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
