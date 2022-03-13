<template>
  <div>
    <v-btn v-bind="btnProps" @click="gotoAllReviews">
      다른 사람들의 리뷰를 확인해보세요!
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    btnProps: {
      color: "orange accent-3",
      text: true,
      "x-small": true,
    },
  }),
  methods: {
    gotoAllReviews() {
      this.$router.push({ path: "/reviews" });
    },
  },
};
</script>
