<template>
  <v-app-bar app rounded elevate-on-scroll class="wrapper">
    <div id="title">Tasty estate</div>

    <v-spacer />

    <AppbarButton v-if="user.email == undefined" :method="gotoLogin" :icon="'fas fa-user-lock'" :button="'로그인'" />
    <AppbarButton v-else :method="logoutHandler" :icon="'fas fa-sign-out-alt'" :button="'로그아웃'" />
    <AppbarButton :method="gotoHome" :icon="'fas fa-home'" :button="'홈'" />
  </v-app-bar>
</template>

<script>
import AppbarButton from "./TheAppbarButton.vue";
import store from "@/store";

export default {
  computed: {
    user() {
      return store.getters.getUser;
    },
  },
  components: {
    AppbarButton,
  },
  mounted() {
    if (!this.isloggedIn()) {
      this.gotoLogin();
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    gotoHome() {
      if (!this.isloggedIn()) {
        alert("로그인 후, 사용 가능합니다.");
        return;
      }
      this.$router.push({ path: "/" });
    },
    logoutHandler() {
      this.kakaoLogout();
      this.clearUser();
      this.gotoLogin();
    },
    kakaoLogout() {
      if (!this.isloggedIn()) {
        return;
      }
      window.Kakao.Auth.logout((response) => {
        if (response == true) {
          alert("정상적으로 로그아웃 하였습니다.");
        } else {
          alert("로그아웃 실패.");
        }
      });
    },
    clearUser() {
      store.commit("updateUser", {});
    },
    isloggedIn() {
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
