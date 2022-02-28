<template>
  <div>
    <v-btn v-bind="btnProps" @click="closeDiag">닫기</v-btn>
    <v-btn v-bind="btnProps" @click="addReview">리뷰 등록하기</v-btn>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data: () => ({
    btnProps: {
      class: "ma-2",
      color: "deep-orange",
      outlined: true,
      rounded: true,
      text: true,
    },
  }),
  methods: {
    closeDiag() {
      store.commit("UPDATE_DIALOG", false);
    },
    addReview() {
      this.$emit("addReview");
    },
  },
};
</script>
