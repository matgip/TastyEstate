<template>
  <div>
    <v-app-bar app>
      <div id="title">Tasty estate</div>

      <v-spacer />
      <v-btn x-small depressed @click="loginWithKakao">
        로그인
        <v-icon right>fas fa-user-lock</v-icon>
      </v-btn>
      <v-btn x-small depressed @click="gotoHome">
        홈
        <v-icon right>fas fa-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    loginWithKakao() {
      window.Kakao.Auth.login({
        success: function(authObj) {
          alert(JSON.stringify(authObj));
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        },
      });
    },
    KakaoLogout() {
      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: "/v1/user/unlink",
          success: function(response) {
            console.log(response);
          },
          fail: function(error) {
            console.log(error);
          },
        });
        window.Kakao.Auth.setAccessToken(undefined);
      }
    },
    gotoHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
#title {
  color: orange;
  font-style: oblique;
  font-size: 26px;
  font-weight: 600;
}
</style>
