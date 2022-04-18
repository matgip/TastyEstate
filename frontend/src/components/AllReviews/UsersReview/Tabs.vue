<template>
  <div>
    <v-tabs :style="tabsStyl" v-bind="tabsProps">
      <v-tab @click="orderByLike">좋아요 순</v-tab>
      <v-tab @click="orderByTime">최신 순</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    orderByLike() {
      this.$emit("order-by-like");
    },
    orderByTime() {
      this.$emit("order-by-time");
    },
  },
  data() {
    return {
      // Vuetify CSS Style & Props
      tabsStyl: {
        margin: "0px 18px",
      },
      tabsProps: {
        left: true,
      },
    };
  },
};
</script>
