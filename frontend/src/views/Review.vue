<template>
  <div>
    <ReviewLayout>
      <EstateName slot="EstateName" :placeName="placeName" />
      <Rating slot="rating" :propRating="rating" @ratingSelected="getRating" />
      <Kindness slot="kindness" :propKindness="kindness" />
      <Price slot="price" :propPrice="price" />
      <Contract slot="contract" :propContract="contract" />
      <TextArea slot="text" :propTitle="title" :propText="text" @reviewTitle="getTitle" @reviewText="getText" />
      <SubmitBtns slot="buttons" @submitReview="onSubmitReview" />
    </ReviewLayout>
  </div>
</template>

<script>
import ReviewLayout from "@/layouts/ReviewLayout.vue";
import EstateName from "@/components/Review/EstateName.vue";
import Rating from "@/components/Review/Rating.vue";
import Kindness from "@/components/Review/Kindness.vue";
import Price from "@/components/Review/Price.vue";
import Contract from "@/components/Review/Contract.vue";
import TextArea from "@/components/Review/TextArea.vue";
import SubmitBtns from "@/components/Review/SubmitBtns.vue";

import { mapGetters } from "vuex";

export default {
  props: ["placeName"],
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
