<template>
  <div>
    <v-pagination v-bind="paginationProps" v-model="page" :length="pageCount" :total-visible="7" />
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
    totalCount: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
  computed: {
    pageCount() {
      if (this.totalCount <= 7) return 1;
      return Math.trunc(this.totalCount / 7 + 1);
    },
  },
  data: () => ({
    // Vuetify CSS style props
    paginationProps: {
      color: "deep-orange",
      circle: true,
      class: "mt-10",
    },
  }),
};
</script>
