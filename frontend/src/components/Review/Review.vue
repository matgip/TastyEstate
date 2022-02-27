<template>
  <div>
    <ReviewLayout>
      <RealEstateName slot="RealEstateName" :placeName="placeName" />
      <ReviewRating slot="Rating" />
      <ReviewKindness slot="Kindness" />
      <ReviewTextArea slot="TextArea" />
      <DiagBtns slot="DiagBtns" />
    </ReviewLayout>
  </div>
</template>

<script>
import ReviewLayout from "./ReviewLayout.vue";
import RealEstateName from "./ReviewREName.vue";
import ReviewRating from "./ReviewRating.vue";
import ReviewKindness from "./ReviewKindness.vue";
import ReviewTextArea from "./ReviewTextArea.vue";
import DiagBtns from "./ReviewBtns.vue";

export default {
  props: {
    placeName: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
  components: {
    ReviewLayout,
    RealEstateName,
    ReviewRating,
    ReviewKindness,
    ReviewTextArea,
    DiagBtns,
  },
  methods: {},
};
</script>
