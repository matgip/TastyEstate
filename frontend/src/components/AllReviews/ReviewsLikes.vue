<template>
  <div>
    <v-btn v-bind="btnProps" @click="onClicked">
      <v-icon v-bind="iconProps"> {{ likesIcon }} </v-icon>
      {{ likes }}
    </v-btn>
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
    btnProps: {
      class: "ml-4",
      depressed: true,
      label: true,
      small: true,
    },
    iconProps: {
      left: true,
      color: "deep-orange",
      "x-small": true,
    },
    likesIcon: "fas fa-thumbs-up",
  }),
  methods: {
    onClicked() {
      console.log("Likes btn Clicked!");
    },
  },
};
</script>
