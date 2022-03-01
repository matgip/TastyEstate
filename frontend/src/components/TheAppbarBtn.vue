<template>
  <BaseButton :btnProps="btnProps" :iconProps="iconProps" :icon="icon" :method="method" :button="button" />
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  data: () => ({
    btnProps: {
      color: "deep-orange",
      depressed: true,
      plain: true,
      "x-small": true,
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
