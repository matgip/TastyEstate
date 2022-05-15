<template>
  <div>
    <header class="login_header_container">
      <h3>로그인 및 회원가입</h3>
      <v-icon @click="onCloseCard()" v-bind="vuetifyCancelIcon">{{ fontAwesomeCancel }}</v-icon>
    </header>
    <div class="seperator"></div>
    <section>
      <h5>믿을 수 있는 부동산 중개업소 찾기. Tasty estate와 함께</h5>

      <v-container fluid>
        <!-- Align Login buttons to center -->
        <v-layout column align-center justify-center>
          <v-flex>
            <LoginKakao :on-login-success-handler="onLoginSuccessHandler" />
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>
import LoginKakao from "./LoginKakao.vue";

export default {
  components: {
    LoginKakao,
  },

  data() {
    return {
      fontAwesomeCancel: "fa-solid fa-xmark",
      vuetifyCancelIcon: {
        color: "black",
      },
    };
  },

  props: {
    onLoginSuccessHandler: {
      type: Function,
      required: true,
      validator: function(func) {
        return func !== null;
      },
    },
  },

  methods: {
    onCloseCard() {
      this.$emit("close-login-card");
    },
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
  margin: 10px 0px;
}

.login_header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0px 20px;
}

.seperator {
  width: 400px;
  margin: 0px auto;
  border-bottom: solid 1px #dcdcdc;
}
</style>
