<template>
  <div>
    <v-btn v-bind="btnProps" @click="likeBtnClicked">
      <v-icon v-bind="iconProps"> {{ likesIcon }} </v-icon>
      {{ likes }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true,
      validator: function(value) {
        return value !== null;
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
  methods: {
    likeBtnClicked() {
      this.$emit("likeBtnClicked", this.userId);
    },
  },
  data: () => ({
    // Vuetify CSS style props
    btnProps: {
      class: "ml-4",
      depressed: true,
      label: true,
      small: true,
    },
    iconProps: {
      left: true,
      color: "deep-orange",
    },
    likesIcon: "fas fa-thumbs-up",
  }),
};
</script>
