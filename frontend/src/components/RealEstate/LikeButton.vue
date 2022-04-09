<template>
  <div>
    <BaseButton :btnProps="btnProps" :method="emitEvent" :icon="likesIcon" :iconProps="iconProps" :button="'좋아요'" />
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
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
  methods: {
    emitEvent() {
      this.$emit("likeBtnClicked");
    },
  },
};
</script>
