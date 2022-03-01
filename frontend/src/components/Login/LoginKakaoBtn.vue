<template>
  <BaseButton :btnProps="btnProps" :iconProps="iconProps" :icon="icon" :method="method" :button="button" />
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  data: () => ({
    btnProps: {
      color: "yellow lighten-1",
    },
    iconProps: {
      left: true,
    },
  }),
  props: ["method", "icon", "button"],
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
.v-btn {
  width: 400px;
}
</style>
