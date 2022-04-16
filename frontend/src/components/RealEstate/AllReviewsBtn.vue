<template>
  <div>
    <v-btn v-bind="btnProps" @click="gotoAllReviews">
      다른 사람들의 리뷰를 확인해보세요!
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
  },
  methods: {
    gotoAllReviews() {
      if (this.isloggedIn() === false) {
        alert("로그인 후, 사용 가능합니다.");
        this.gotoLogin();
        return;
      }
      this.$router.push({ path: "/reviews" });
    },
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    isloggedIn() {
      return this.user != null;
    },
  },
  data: () => ({
    // Vuetify CSS style props
    btnProps: {
      color: "blue darken-4",
      text: true,
      small: true,
    },
  }),
};
</script>
