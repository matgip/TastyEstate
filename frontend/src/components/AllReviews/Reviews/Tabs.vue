<template>
  <div>
    <v-tabs v-bind="tabsProps">
      <v-tab @click="orderByLike">좋아요 순</v-tab>
      <v-tab @click="orderByTime">최신 순</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsProps: {
        left: true,
      },
    };
  },
  methods: {
    orderByLike() {
      this.$emit("orderByLike");
    },
    orderByTime() {
      this.$emit("orderByTime");
    },
  },
};
</script>
