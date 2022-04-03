<template>
  <v-app-bar app rounded elevate-on-scroll class="wrapper">
    <div id="title" @click="gotoHome">Tasty estate</div>

    <v-spacer />

    <AppbarBtn v-if="user.id == undefined" :method="gotoLogin" :icon="'fas fa-user-lock'" :button="'로그인'" />
    <AppbarBtn v-else :method="onLogout" :icon="'fas fa-sign-out-alt'" :button="'로그아웃'" />
    <AppbarBtn :method="gotoHome" :icon="'fas fa-home'" :button="'홈'" />
  </v-app-bar>
</template>

<script>
import AppbarBtn from "./TheAppbarBtn.vue";

export default {
  components: {
    AppbarBtn,
  },
  mounted() {
    if (this.isloggedIn() == false) {
      this.gotoLogin();
    }
  },
  computed: {
    user() {
      return this.$store.getters.GET_USER;
    },
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
  font-size: 30px;
  font-weight: 500;
}
</style>
