<template>
  <div>
    <v-btn v-bind="btnProps" @click="emitEvent">
      <v-icon v-bind="iconProps">
        {{ likesIcon }}
      </v-icon>
      좋아요({{ likes }})
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    btnProps: {
      class: "ma-2",
      color: "deep-orange",
      outlined: true,
      rounded: true,
      "x-small": true,
    },
    iconProps: {
      left: true,
      "x-small": true,
    },
    likesIcon: "fas fa-heart",
  }),
  props: {
    likes: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
  methods: {
    emitEvent() {
      this.$emit("likeBtnClicked");
    },
  },
};
</script>
