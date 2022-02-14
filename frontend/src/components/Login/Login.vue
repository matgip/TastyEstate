<template>
  <div>
    <h3>로그인 및 회원가입</h3>
    <div class="seperator"></div>
    <h5>믿을 수 있는 부동산 중개업소 찾기. Tasty estate와 함께</h5>

    <LoginLayout>
      <LoginKakao />
    </LoginLayout>
  </div>
</template>

<script>
import LoginLayout from "./LoginLayout.vue";
import LoginKakao from "./LoginKakao.vue";

export default {
  components: {
    LoginLayout,
    LoginKakao,
  },
};
</script>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
  margin: 30px 0px;
}

h5 {
  display: flex;
  justify-content: center;
  margin: 20px 0px;
}
</style>
