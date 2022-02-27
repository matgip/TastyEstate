<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>⭐ 평가점수를 입력해주세요!</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <span v-bind="textProp"> ({{ rating }}) </span>
      <v-rating v-bind="starProps" v-model="rating"></v-rating>
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
};
</script>

<style></style>
