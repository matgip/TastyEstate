<template>
  <div>
    <BaseButton
      :style="btnStyl"
      :btnProps="btnProps"
      :method="estateLikeBtnClicked"
      :icon="'fas fa-heart'"
      :iconProps="iconProps"
      :button="'좋아요'"
    />
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  methods: {
    estateLikeBtnClicked() {
      this.$emit("estateLikeBtnClicked");
    },
  },
  data: () => ({
    // Vuetify CSS Style & Props
    btnStyl: {
      margin: "34px 18px",
    },
    btnProps: {
      color: "deep-orange",
      outlined: true,
      rounded: true,
    },
    iconProps: {
      left: true,
    },
  }),
  components: {
    BaseButton,
  },
};
</script>
