<template>
  <div>
    <v-container fluid>
      <v-layout column align-center justify-center>
        <v-flex>
          <v-btn color="yellow lighten-1" @click="loginWithKakao">
            <v-icon left>fas fa-comment</v-icon>
            카카오 로그인
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithKakao() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image, account_email, gender",
        success: this.getProfile,
      });
    },
    getProfile(authObj) {
      console.log(authObj);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log(res);

          alert("로그인 성공");
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
  },
};
</script>

<style scoped>
.v-btn {
  width: 400px;
}
</style>
