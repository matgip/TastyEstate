<template>
  <div>
    <BaseButton :btnProps="btnProps" :method="closeDiag" :button="'닫기'" />
    <BaseButton :btnProps="btnProps" :method="submit" :button="'리뷰 등록하기'" />
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  methods: {
    closeDiag() {
      this.$store.commit("UPDATE_DIALOG", false);
    },
    submit() {
      this.$emit("submitReview");
    },
  },
  data: () => ({
    // Vuetify CSS Style & Props
    btnProps: {
      class: "ma-2",
      color: "deep-orange",
      outlined: true,
      rounded: true,
      text: true,
    },
  }),
  components: {
    BaseButton,
  },
};
</script>
