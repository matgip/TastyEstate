<template>
  <div>
    <base-button
      :style="btnStyl"
      :btn-props="btnProps"
      :icon-props="iconProps"
      :method="estateLikeBtnClicked"
      :icon="'fas fa-heart'"
      :button="'좋아요'"
    />
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  methods: {
    estateLikeBtnClicked() {
      this.$emit("like-estate");
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
