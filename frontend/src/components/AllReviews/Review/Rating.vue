<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>🌟 평점을 남겨주세요</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-rating v-bind="starProps" v-model="rating"></v-rating>
      <span v-bind="textProp"> ({{ rating }}) </span>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    propRating: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0.0;
      },
    },
  },
  computed: {
    rating: {
      get() {
        return this.propRating;
      },
      set(newRating) {
        this.$emit("ratingSelected", newRating);
      },
    },
  },
  data: () => ({
    // Vuetify CSS Style & Props
    textProp: {
      class: "grey--text text-caption mr-2",
    },
    starProps: {
      size: 18,
      color: "amber",
      dense: true,
      "half-increments": true,
    },
  }),
};
</script>

<style></style>
