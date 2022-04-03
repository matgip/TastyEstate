<template>
  <div class="wrapper">
    <GraphsLayout>
      <KindnessGraph slot="KindnessGraph" />
      <PriceGraph slot="PriceGraph" />
      <ContractGraph slot="ContractGraph" />
    </GraphsLayout>

    <ReviewsLayout v-for="(review, i) in reviews" :key="i">
      <Avatar slot="Avatar" :avatar="review.avatar" />
      <Stars slot="Rating" :rating="review.rating" />
      <Likes slot="Likes" :likes="review.likes" />
      <Title slot="Title" :title="review.title" />
      <Content slot="Content" :text="review.text" />
    </ReviewsLayout>

    <Pagenation :totalCount="totalCount" />
  </div>
</template>

<script>
import GraphsLayout from "./GraphsLayout.vue";
import KindnessGraph from "./KindnessGraph.vue";
import PriceGraph from "./PriceGraph.vue";
import ContractGraph from "./ContractGraph.vue";

import ReviewsLayout from "./ReviewsLayout.vue";
import Avatar from "./ReviewsAvatar.vue";
import Stars from "./ReviewsStars.vue";
import Likes from "./ReviewsLikes.vue";
import Title from "./ReviewsTitle.vue";
import Content from "./ReviewsContent.vue";
import Pagenation from "./ReviewsPagination.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    GraphsLayout,
    KindnessGraph,
    PriceGraph,
    ContractGraph,
    ReviewsLayout,
    Avatar,
    Stars,
    Likes,
    Title,
    Content,
    Pagenation,
  },
  mounted() {
    const queryRange = "0-6";
    this.getReviews(queryRange);
  },
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
    reviews() {
      return this.reviewObjs;
    },
    totalCount() {
      return this.reviews.length;
    },
  },
  methods: {
    async getReviews(queryRange) {
      try {
        const reviewedUsers = await this.$api.reviewLikesOrder.get(this.estate.id, queryRange);
        for (let i = 0; i < reviewedUsers.data.length; i++) {
          const user = reviewedUsers.data[i].value;
          const review = await this.$api.review.get(this.estate.id, user.split(":")[1]);
          this.reviewObjs.push(review.data);
          this.reviewObjs[i].rating = parseFloat(this.reviewObjs[i].rating);
          this.reviewObjs[i].likes = reviewedUsers.data[i].score;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  data: () => ({
    reviewObjs: [],
  }),
};
</script>
