<template>
  <div>
    <ReviewLayout>
      <RealEstateName slot="RealEstateName" :placeName="placeName" />
      <ReviewRating slot="Rating" :propRating="rating" @ratingSelected="getRating" />
      <ReviewKindness slot="Kindness" :propKindness="kindness" @kindnessSelected="getKindness" />
      <ReviewPrice slot="Price" :propPrice="price" @priceSelected="getPrice" />
      <ReviewContracted slot="isContracted" :propIsContracted="isContracted" @isContracted="getContracted" />
      <ReviewTextArea slot="TextArea" :propText="text" @reviewText="getText" />
      <DiagBtns slot="DiagBtns" @addReview="addReviewHandler" />
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

import store from "@/store";

export default {
  data: () => ({
    rating: 0.0,
    kindness: "",
    price: "",
    isContracted: null,
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
    addReviewHandler() {
      this.rating = 0.0;
      this.kindness = "";
      this.price = "";
      this.isContracted = null;
      this.text = "";
      store.commit("UPDATE_DIALOG", false);
    },
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
