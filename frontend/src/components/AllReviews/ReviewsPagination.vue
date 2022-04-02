<template>
  <div>
    <v-pagination v-bind="paginationProps" v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
  data: () => ({
    page: 1,
    paginationProps: {
      color: "deep-orange",
      circle: true,
    },
  }),
  computed: {
    pageCount() {
      if (this.totalCount <= 7) return 1;
      return this.totalCount / 7;
    },
  },
};
</script>

<style></style>
