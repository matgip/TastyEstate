<template>
  <div>
    <v-row v-bind="rowProps">
      <v-rating v-bind="starProps" :value="stars"></v-rating>
      <div class="grey--text ms-4">{{ stars }} ({{ likes }} 좋아요)</div>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    stars: {
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
  data: () => ({
    // Vuetify CSS Style & Props
    rowProps: {
      align: "center",
      class: "ma-0",
    },
    starProps: {
      size: 18,
      color: "amber",
      dense: true,
      readonly: true,
      "half-increments": true,
    },
  }),
  methods: {},
};
</script>
