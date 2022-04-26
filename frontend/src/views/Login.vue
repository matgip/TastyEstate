<template>
  <div >
    <h3>로그인 및 회원가입</h3>
    <div class="seperator"></div>
    <h5>믿을 수 있는 부동산 중개업소 찾기. Tasty estate와 함께</h5>

    <v-container fluid>
      <!-- Align Login buttons to center -->
      <v-layout column align-center justify-center>
        <v-flex>
          <login-kakao />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import LoginKakao from "../components/Login/LoginKakao.vue";

export default {
  components: {
    LoginKakao,
  },
};
</script>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
  padding: 30px 0px;
}

h5 {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}

.seperator {
  width: 400px;
  margin: 30px auto;
  border-bottom: solid 1px #dcdcdc;
}
</style>
