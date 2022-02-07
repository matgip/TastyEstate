<template>
  <div>
    <v-app>
      <v-app-bar app rounded elevate-on-scroll class="wrapper">
        <div id="title">Tasty estate</div>

        <v-spacer />

        <v-btn
          v-if="user.email == undefined"
          x-small
          plain
          depressed
          color="deep-orange"
          @click="gotoLogin"
        >
          로그인
          <v-icon right>fas fa-user-lock</v-icon>
        </v-btn>
        <v-btn
          v-else
          x-small
          plain
          depressed
          color="deep-orange"
          @click="logOut"
        >
          로그아웃
          <v-icon right>fas fa-sign-out-alt</v-icon>
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
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  mounted() {
    if (!this.isLoggedIn()) {
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
    gotoHome() {
      if (!this.isLoggedIn()) {
        alert("로그인 후, 사용가능합니다.");
        this.$router.push({ path: "/login" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    isLoggedIn() {
      return this.user.email != undefined;
    },
    logOut() {
      this.kakaoLogout();
      alert("로그아웃");
    },
    kakaoLogout() {
      if (!window.Kakao.Auth.getAccessToken()) {
        console.log("Not logged in");
        return;
      }

      window.Kakao.Auth.logout((response) => {
        console.log(response);
        this.$store.commit("updateUser", {});
        this.$router.push({ path: "/login" });
      });
    },
  },
};
</script>

<style scoped>
#title {
  color: #ff5722;
  font-style: oblique;
  font-size: 30px;
  font-weight: 500;
}
</style>
