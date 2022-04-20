<template>
  <div>
    <base-button
      :btn-props="btnProps"
      :icon-props="iconProps"
      :onClick="handleLikeReview"
      :icon="'fas fa-thumbs-up'"
      :button="likes"
    />
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

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
    handleLikeReview() {
      this.$emit("like-review", this.userId);
    },
  },

  data: () => ({
    // Vuetify CSS Style & Props
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
  }),

  components: {
    BaseButton,
  },
};
</script>
