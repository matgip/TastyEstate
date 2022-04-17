<template>
  <div>
    <v-row v-bind="rowProps">
      <v-rating v-bind="ratingProps" :value="rating" />
      <div v-bind="textProps">({{ rating }})</div>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
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
      class: "ml-2",
    },
    ratingProps: {
      size: 18,
      color: "amber",
      dense: true,
      readonly: true,
      "half-increments": true,
    },
    textProps: {
      class: "grey--text mx-2",
    },
  }),
};
</script>
