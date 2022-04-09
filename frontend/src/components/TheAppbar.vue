<template>
  <v-app-bar app rounded elevate-on-scroll>
    <div id="title" @click="gotoHome">
      <img src="@/assets/logo.png" />
    </div>

    <v-spacer />

    <MapSearch />
    <v-spacer />

    <AppbarBtn v-if="user.id == undefined" :method="gotoLogin" :icon="'fas fa-user-lock'" :button="'로그인'" />
    <AppbarBtn v-else :method="onLogout" :icon="'fas fa-sign-out-alt'" :button="'로그아웃'" />
    <AppbarBtn :method="gotoHome" :icon="'fas fa-home'" :button="'홈'" />
  </v-app-bar>
</template>

<script>
import MapSearch from "./Map/MapSearch.vue";
import AppbarBtn from "./TheAppbarBtn.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    MapSearch,
    AppbarBtn,
  },
  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
  },
  methods: {
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    gotoHome() {
      this.$router.push({ path: "/" });
    },
    async onLogout() {
      if (this.isloggedIn() == false) {
        return;
      }
      try {
        await this.logoutKakao();
        this.$store.commit("UPDATE_USER", {});
        this.gotoLogin();
        alert("정상적으로 로그아웃 하였습니다.");
      } catch (err) {
        console.error(err);
        alert("로그아웃 실패.");
      }
    },
    logoutKakao() {
      return new Promise((resolve, reject) => {
        window.Kakao.Auth.logout((res) => {
          console.log(res);
          if (res == true) {
            resolve();
          } else {
            reject(new Error("Failed to kakao logout"));
          }
        });
      });
    },
    isloggedIn() {
      return this.user.id != undefined;
    },
  },
};
</script>

<style scoped>
#title {
  color: #ff5722;
  cursor: pointer;
  font-style: oblique;
  font-size: 24px;
  font-weight: 500;
}
</style>
