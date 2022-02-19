<template>
  <div>
    <v-card-text>
      <v-row v-bind="rowProps">
        <v-rating v-bind="ratingProps" :value="4.5"></v-rating>
        <div class="grey--text ms-4">{{ rating }} ({{ likes }})</div>
      </v-row>
    </v-card-text>
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
