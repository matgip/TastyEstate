<template>
  <v-app-bar app rounded elevate-on-scroll class="wrapper">
    <div id="title">Tasty estate</div>

    <v-spacer />

    <AppbarBtn v-if="user.email == undefined" :method="gotoLogin" :icon="'fas fa-user-lock'" :button="'로그인'" />
    <AppbarBtn v-else :method="logoutHandler" :icon="'fas fa-sign-out-alt'" :button="'로그아웃'" />
    <AppbarBtn :method="gotoHome" :icon="'fas fa-home'" :button="'홈'" />
  </v-app-bar>
</template>

<script>
import AppbarBtn from "./TheAppbarBtn.vue";
import store from "@/store";

export default {
  computed: {
    user() {
      return store.getters.getUser;
    },
  },
  components: {
    AppbarBtn,
  },
  mounted() {
    if (this.isloggedIn() == false) {
      this.gotoLogin();
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    gotoHome() {
      if (this.isloggedIn() == false) {
        alert("로그인 후, 사용 가능합니다.");
        return;
      }
      this.$router.push({ path: "/" });
    },
    logoutHandler() {
      this.logoutKakao();
      this.clearUser();
      this.gotoLogin();
    },
    logoutKakao() {
      if (this.isloggedIn() == false) {
        return;
      }
      window.Kakao.Auth.logout(function(res) {
        if (res == true) {
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
