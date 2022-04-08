<template>
  <div>
    <v-tabs v-bind="tabsProps">
      <v-tab @click="emitLikeClicked">좋아요 순</v-tab>
      <v-tab @click="emitTimeClicked">최신 순</v-tab>
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
    emitLikeClicked() {
      this.$emit("orderByLike");
    },
    emitTimeClicked() {
      this.$emit("orderByTime");
    },
  },
};
</script>
