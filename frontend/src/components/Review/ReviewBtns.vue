<template>
  <div>
    <v-btn text @click="closeDiag">닫기</v-btn>
    <v-btn text @click="addReview">리뷰 등록하기</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    closeDiag() {
      this.$emit("closeBtnClicked");
    },
    addReview() {
      this.$emit("saveBtnClicked");
    },
  },
};
</script>
