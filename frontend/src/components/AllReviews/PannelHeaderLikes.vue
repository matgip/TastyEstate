<template>
  <div v-bind="divProps">
    <v-chip v-bind="likesProps">
      <v-icon v-bind="iconProps"> {{ likesIcon }} </v-icon>
      {{ likes }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    likes: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
  data: () => ({
    divProps: {
      class: "mb-6",
    },
    likesProps: {
      color: "red lighten-4",
      class: "ml-0 mr-2 black--text",
      label: true,
      small: true,
    },
    iconProps: {
      left: true,
      color: "red",
      "x-small": true,
    },
    likesIcon: "fas fa-heart",
  }),
};
</script>
