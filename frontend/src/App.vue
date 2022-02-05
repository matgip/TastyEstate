<template>
  <div>
    <v-app>
      <v-app-bar app rounded elevate-on-scroll class="wrapper">
        <div id="title">Tasty estate</div>

        <v-spacer />

        <v-btn x-small plain depressed color="deep-orange" @click="gotoLogin">
          로그인
          <v-icon right>fas fa-user-lock</v-icon>
        </v-btn>
        <v-btn x-small plain depressed color="deep-orange" @click="gotoHome">
          홈
          <v-icon right>fas fa-home</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <router-view :key="$route.fullPath"></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    gotoHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
#title {
  color: #ff5722;
  font-style: oblique;
  font-size: 26px;
  font-weight: 600;
}
</style>
