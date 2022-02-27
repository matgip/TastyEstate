<template>
  <div>
    <ReviewLayout>
      <RealEstateName slot="RealEstateName" :placeName="placeName" />
      <ReviewRating slot="Rating" />
      <ReviewKindness slot="Kindness" />
      <DiagBtns slot="DiagBtns" />
    </ReviewLayout>
  </div>
</template>

<script>
import ReviewLayout from "./ReviewLayout.vue";
import RealEstateName from "./ReviewREName.vue";
import ReviewRating from "./ReviewRating.vue";
import ReviewKindness from "./ReviewKindness.vue";
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
    DiagBtns,
  },
  methods: {},
};
</script>
