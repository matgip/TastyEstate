<template>
  <div>
    <base-button :btn-props="btnProps" :onClick="closeDiag" :button="'닫기'" />
    <base-button :btn-props="btnProps" :onClick="submit" :button="'리뷰 등록하기'" />
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
      this.$emit("submit-review");
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
