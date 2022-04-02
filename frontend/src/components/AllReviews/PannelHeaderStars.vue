<template>
  <div v-bind="divProps">
    <v-row v-bind="rowProps">
      <v-rating v-bind="starProps" :value="stars" />
      <div v-bind="textProps">({{ stars }})</div>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    divProps: {
      class: "mb-6 ml-2",
    },
    rowProps: {
      align: "center",
    },
    starProps: {
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
  props: {
    stars: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
};
</script>
