<template>
  <div>
    <ReviewLayout>
      <RealEstateName slot="realestateName" :placeName="placeName" />
      <ReviewRating slot="rating" :propRating="rating" @ratingSelected="getRating" />
      <ReviewKindness slot="kindness" :propKindness="kindness" />
      <ReviewPrice slot="price" :propPrice="price" />
      <ReviewContract slot="contract" :propContract="contract" />
      <ReviewTextArea slot="text" :propTitle="title" :propText="text" @reviewTitle="getTitle" @reviewText="getText" />
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
    title: "",
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
      const resp = await this.$api.review.get(this.estate.id, this.user.id);
      if (resp && resp.status === 204) {
        // No contents
        await this.$api.review.post(this.estate.id, {
          userId: this.user.id,
          rating: this.rating,
          kindness: this.kindness,
          price: this.price,
          contract: this.contract,
          title: this.title,
          text: this.text,
        });
        await this.$api.reviewRatings.put(this.estate.id, "", { rating: this.rating });
        await this.$api.reviewLikesOrder.put(this.estate.id, "", { user: this.user.id });
        await this.$api.reviewTimeOrder.put(this.estate.id, "", { user: this.user.id });

        this.$store.dispatch("getStars", this.estate.id);
      }
      this.clearReview();
    },
    getRating(rating) {
      this.rating = rating;
    },
    getTitle(title) {
      this.title = title;
    },
    getText(text) {
      this.text = text;
    },
    clearReview() {
      this.rating = 0.0;
      this.title = "";
      this.text = "";
      this.$store.commit("UPDATE_KINDNESS", "");
      this.$store.commit("UPDATE_PRICE", "");
      this.$store.commit("UPDATE_CONTRACT", null);
      this.$store.commit("UPDATE_DIALOG", false);
    },
  },
};
</script>
