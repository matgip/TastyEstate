<template>
  <div>
    <review-layout>
      <estate-name slot="estate-name" :place-name="estate.place_name" />
      <rating slot="review-rating" :prop-rating="rating" @rating-selected="handleEventRating" />

      <price-chk-box slot="review-price" :prop-price="price" />
      <kindness-chk-box slot="review-kindness" :prop-kindness="kindness" />
      <contract-chk-box slot="review-contract" :prop-contract="contract" />

      <text-area
        slot="review-title-and-text"
        :prop-title="title"
        :prop-text="text"
        @review-title="handleEventTitle"
        @review-text="handleEventText"
      />
      <submit-btns slot="review-buttons" @submit-review="handleEventSubmit" />
    </review-layout>
  </div>
</template>

<script>
import ReviewLayout from "@/layouts/ReviewLayout.vue";
import EstateName from "./EstateName.vue";
import Rating from "./Rating.vue";
import KindnessChkBox from "./KindnessChkBox.vue";
import PriceChkBox from "./PriceChkBox.vue";
import ContractChkBox from "./ContractChkBox.vue";
import TextArea from "./TextArea.vue";
import SubmitBtns from "./SubmitBtns.vue";

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
    KindnessChkBox,
    PriceChkBox,
    ContractChkBox,
    TextArea,
    SubmitBtns,
  },
};
</script>
