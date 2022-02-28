<template>
  <div>
    <ReviewLayout>
      <RealEstateName slot="RealEstateName" :placeName="placeName" />
      <ReviewRating slot="Rating" @ratingSelected="getRating" />
      <ReviewKindness slot="Kindness" @kindnessSelected="getKindness" />
      <ReviewPrice slot="Price" @priceSelected="getPrice" />
      <ReviewContracted slot="isContracted" @isContracted="getContracted" />
      <ReviewTextArea slot="TextArea" @reviewText="getText" />
      <DiagBtns slot="DiagBtns" />
    </ReviewLayout>
  </div>
</template>

<script>
import ReviewLayout from "./ReviewLayout.vue";
import RealEstateName from "./ReviewREName.vue";
import ReviewRating from "./ReviewRating.vue";
import ReviewKindness from "./ReviewKindness.vue";
import ReviewPrice from "./ReviewPrice.vue";
import ReviewContracted from "./ReviewContractRate.vue";
import ReviewTextArea from "./ReviewTextArea.vue";
import DiagBtns from "./ReviewBtns.vue";

export default {
  data: () => ({
    rating: 0.0,
    kindness: "",
    price: "",
    isContracted: false,
    text: "",
  }),
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
    ReviewPrice,
    ReviewContracted,
    ReviewTextArea,
    DiagBtns,
  },
  methods: {
    getRating(rating) {
      this.rating = rating;
    },
    getKindness(kindness) {
      this.kindness = kindness;
    },
    getPrice(price) {
      this.price = price;
    },
    getContracted(isContracted) {
      this.isContracted = isContracted;
    },
    getText(text) {
      this.text = text;
    },
  },
};
</script>
