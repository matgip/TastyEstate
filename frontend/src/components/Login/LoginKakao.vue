<template>
  <div>
    <v-container fluid>
      <v-layout column align-center justify-center>
        <v-flex>
          <v-btn color="yellow lighten-1" @click="login">
            <v-icon left>fas fa-comment</v-icon>
            카카오 로그인
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    login() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image, account_email, gender",
        success: (authObj) => {
          console.log(authObj);
          this.getProfile();
        },
        fail: (err) => console.log(err),
      });
    },
    getProfile() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (profile) => {
          this.updateDb(profile);
          this.$store.commit("updateUser", profile.kakao_account);
          // If successfully logged in, then redirect to home
          this.$router.push({ path: "/" });
        },
        fail: (err) => console.log(err),
      });
    },
    updateDb(profile) {
      axios
        .post("/api/users", {
          email: profile.kakao_account.email,
          nickname: profile.kakao_account.profile.nickname,
        })
        .then(({ data }) => console.log(data))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.v-btn {
  width: 400px;
}
</style>
