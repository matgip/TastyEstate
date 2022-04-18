<template>
  <div>
    <review-layout>
      <estate-name slot="EstateName" :place-name="estate.place_name" />
      <rating slot="rating" :prop-rating="rating" @rating-selected="handleEventRating" />
      <kindness slot="kindness" :prop-kindness="kindness" />
      <price slot="price" :prop-price="price" />
      <contract slot="contract" :prop-contract="contract" />
      <text-area
        slot="text"
        :prop-title="title"
        :prop-text="text"
        @review-title="handleEventTitle"
        @review-text="handleEventText"
      />
      <submit-btns slot="buttons" @submit-review="handleEventSubmit" />
    </review-layout>
  </div>
</template>

<script>
import ReviewLayout from "@/layouts/ReviewLayout.vue";
import EstateName from "@/components/AllReviews/Review/EstateName.vue";
import Rating from "@/components/AllReviews/Review/Rating.vue";
import Kindness from "@/components/AllReviews/Review/Kindness.vue";
import Price from "@/components/AllReviews/Review/Price.vue";
import Contract from "@/components/AllReviews/Review/Contract.vue";
import TextArea from "@/components/AllReviews/Review/TextArea.vue";
import SubmitBtns from "@/components/AllReviews/Review/SubmitBtns.vue";

import { mapGetters } from "vuex";

export default {
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
    async handleEventSubmit() {
      try {
        const resp = await this.$api.review.get({ baseId: this.estate.id, subIds: [this.user.id] });
        if (resp && resp.status === 204) {
          const current = new Date();
          // Fix-me: Depeding on kakao profile, needed to decouple
          await this.$api.review.post({
            baseId: this.estate.id,
            data: {
              userId: this.user.id,
              avatar: this.user.avatar,
              nickname: this.user.nickname,
              time: current.toLocaleDateString(),
              rating: this.rating,
              kindness: this.kindness,
              price: this.price,
              contract: this.contract,
              title: this.title,
              text: this.text,
            },
          });
          await this.$api.reviewRatings.put({
            baseId: this.estate.id,
            data: { rating: this.rating },
          });
          await this.$api.reviewLikesOrder.post({
            baseId: this.estate.id,
            data: { user: this.user.id },
          });
          await this.$api.reviewTimeOrder.post({
            baseId: this.estate.id,
            data: { user: this.user.id },
          });
          this.$store.dispatch("getStars", this.estate.id);
        }
        await this.clearReview();
      } catch (err) {
        console.error(err);
      }
    },
    handleEventRating(rating) {
      this.rating = rating;
    },
    handleEventTitle(title) {
      this.title = title;
    },
    handleEventText(text) {
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
  data: () => ({
    rating: 0.0,
    title: "",
    text: "",
  }),
  components: {
    ReviewLayout,
    EstateName,
    Rating,
    Kindness,
    Price,
    Contract,
    TextArea,
    SubmitBtns,
  },
};
</script>
