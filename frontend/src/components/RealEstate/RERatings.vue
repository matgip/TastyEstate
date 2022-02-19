<template>
  <div>
    <v-row v-bind="rowProps">
      <v-rating v-bind="ratingProps" :value="rating"></v-rating>
      <div class="grey--text ms-4">{{ rating }} ({{ likes }})</div>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    rowProps: {
      align: "center",
      class: "mx-0",
    },
    ratingProps: {
      size: 18,
      color: "amber",
      dense: true,
      readonly: true,
      "half-increments": true,
    },
  }),
  props: {
    rating: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
    likes: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
  methods: {},
};
</script>
