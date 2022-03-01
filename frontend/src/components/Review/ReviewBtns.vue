<template>
  <div>
    <BaseButton :btnProps="btnProps" :method="closeDiag" :button="'닫기'" />
    <BaseButton :btnProps="btnProps" :method="submit" :button="'리뷰 등록하기'" />
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

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
    submit() {
      this.$emit("submitReview");
    },
  },
  components: {
    BaseButton,
  },
};
</script>
