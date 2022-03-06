<template>
  <div>
    <ReviewLayout>
      <RealEstateName slot="realestateName" :placeName="placeName" />
      <ReviewRating slot="rating" :propRating="rating" @ratingSelected="getRating" />
      <ReviewKindness slot="kindness" :propKindness="kindness" />
      <ReviewPrice slot="price" :propPrice="price" />
      <ReviewContract slot="contract" :propContract="contract" />
      <ReviewTextArea slot="text" :propText="text" @reviewText="getText" />
      <DiagBtns slot="buttons" @submitReview="onSubmitReview" />
    </ReviewLayout>
  </div>
</template>

<script>
import ReviewLayout from "./ReviewLayout.vue";
import RealEstateName from "./ReviewREName.vue";
import ReviewRating from "./ReviewRating.vue";
import ReviewKindness from "./ReviewKindness.vue";
import ReviewPrice from "./ReviewPrice.vue";
import ReviewContract from "./ReviewContract.vue";
import ReviewTextArea from "./ReviewTextArea.vue";
import DiagBtns from "./ReviewBtns.vue";

import { mapGetters } from "vuex";

export default {
  data: () => ({
    rating: 0.0,
    text: "",
  }),
  props: ["placeName"],
  components: {
    ReviewLayout,
    RealEstateName,
    ReviewRating,
    ReviewKindness,
    ReviewPrice,
    ReviewContract,
    ReviewTextArea,
    DiagBtns,
  },
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
      kindness: "GET_KINDNESS",
      price: "GET_PRICE",
      contract: "GET_CONTRACT",
    }),
  },
  methods: {
    async onSubmitReview() {
      await this.$api.reviewLikesOrder.put(this.estate.id, "", { user: this.user.id });
      await this.$api.reviewTimeOrder.put(this.estate.id, "", { user: this.user.id });
      this.clearReview();
    },
    getRating(rating) {
      this.rating = rating;
    },
    getText(text) {
      this.text = text;
    },
    clearReview() {
      this.rating = 0.0;
      this.text = "";
      this.$store.commit("UPDATE_KINDNESS", "");
      this.$store.commit("UPDATE_PRICE", "");
      this.$store.commit("UPDATE_CONTRACT", null);
      this.$store.commit("UPDATE_DIALOG", false);
    },
  },
};
</script>
