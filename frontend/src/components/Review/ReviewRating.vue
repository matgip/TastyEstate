<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>🌟 평가점수를 입력해주세요!</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-rating v-bind="starProps" v-model="rating" @input="emitRating"></v-rating>
      <span v-bind="textProp"> ({{ rating }}) </span>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data: () => ({
    rating: 0.0,
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
  methods: {
    emitRating() {
      this.$emit("ratingSelected", this.rating);
    },
  },
};
</script>

<style></style>
