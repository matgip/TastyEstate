<template>
  <div>
    <BaseButton
      :btnProps="btnProps"
      :method="estateLikeBtnClicked"
      :icon="likesIcon"
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
    likesIcon: "fas fa-heart",
    // Vuetify CSS Style & Props
    btnProps: {
      color: "deep-orange",
      outlined: true,
      rounded: true,
      "x-small": true,
    },
    iconProps: {
      left: true,
      "x-small": true,
    },
  }),
  components: {
    BaseButton,
  },
};
</script>
