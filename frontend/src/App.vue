<template>
  <div>
    <v-app>
      <v-app-bar app rounded elevate-on-scroll class="wrapper">
        <div id="title">Tasty estate</div>

        <v-spacer />

        <v-btn v-if="user.email == undefined" x-small plain depressed color="deep-orange" @click="onGotoLogin">
          <v-icon left>fas fa-user-lock</v-icon>
          로그인
        </v-btn>
        <v-btn v-else x-small plain depressed color="deep-orange" @click="onLogOutAndClearUser">
          <v-icon left>fas fa-sign-out-alt</v-icon>
          로그아웃
        </v-btn>
        <v-btn x-small plain depressed color="deep-orange" @click="onGotoHome">
          <v-icon left>fas fa-home</v-icon>
          홈
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
  data: () => ({}),
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  mounted() {
    if (!this.isLoggedIn()) {
      this.onGotoLogin();
    }
  },
  methods: {
    onGotoLogin() {
      this.$router.push({ path: "/login" });
    },
    onGotoHome() {
      if (!this.isLoggedIn()) {
        alert("로그인 후, 사용 가능합니다.");
        return;
      }
      this.$router.push({ path: "/" });
    },
    onLogOutAndClearUser() {
      const self = this;
      kakaoLogout();
      vuexClearUser();
      // If logout was successful, go back to login
      this.onGotoLogin();

      function kakaoLogout() {
        if (!self.isLoggedIn()) {
          return;
        }
        window.Kakao.Auth.logout((response) => {
          if (response == true) {
            alert("정상적으로 로그아웃 하였습니다.");
          } else {
            alert("로그아웃 실패.");
          }
        });
      }

      function vuexClearUser() {
        self.$store.commit("updateUser", {});
      }
    },
    isLoggedIn() {
      return this.user.email != undefined;
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
