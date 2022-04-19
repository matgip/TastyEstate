<template>
  <base-button :btn-props="btnProps" :icon-props="iconProps" :icon="icon" :method="method" :button="button" />
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },

  data: () => ({
    // Vuetify CSS Style & Props
    btnProps: {
      color: "yellow lighten-1",
    },
    iconProps: {
      left: true,
    },
  }),

  props: ["method", "icon", "button"],
};
</script>

<style scoped>
.v-btn {
  width: 400px;
}

@media screen and (max-width: 768px) {
  .v-btn {
    width: 300px;
  }
}
</style>
