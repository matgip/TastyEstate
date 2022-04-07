<template>
  <div class="wrapper">
    <GraphsLayout>
      <KindnessGraph :key="kindness.count" :data="kindness.stats" slot="KindnessGraph" />
      <PriceGraph :key="price.count" :data="price.stats" slot="PriceGraph" />
      <ContractGraph :key="contract.count" :data="contract.stats" slot="ContractGraph" />
    </GraphsLayout>

    <ReviewsLayout v-for="(review, i) in reviews" :key="i">
      <Avatar slot="Avatar" :avatar="review.avatar" />
      <Stars slot="Rating" :rating="review.rating" />
      <Likes slot="Likes" :likes="review.likes" />
      <Title slot="Title" :title="review.title" />
      <Content slot="Content" :text="review.text" />
    </ReviewsLayout>

    <Pagenation :page="page" :totalCount="totalCount" />
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
  async mounted() {
    this.page = 1;
    const pageRange = "0~-1";
    await this.constructReviews(pageRange);
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
  data: () => ({
    kindnessKey: 0,
    page: 0,
    price: {
      count: 0,
      stats: [0, 0, 0, 0, 0],
      fields: ["veryCheap", "cheap", "avgPrice", "expensive", "veryExpensive"],
    },
    kindness: {
      count: 0,
      stats: [0, 0, 0, 0, 0],
      fields: ["veryKind", "kind", "soso", "unKind", "veryUnkind"],
    },
    contract: {
      count: 0,
      stats: [0, 0],
    },
    reviewObjs: [],
  }),
  methods: {
    async constructReviews(queryRange) {
      try {
        if (this.estate === undefined || this.estate.id === undefined) {
          // When page is refreshed...
          this.gotoHome();
          return;
        }
        const reviewedUsers = await this.$api.reviewLikesOrder.get(this.estate.id, queryRange);
        for (let i = 0; i < reviewedUsers.data.length; i++) {
          const user = reviewedUsers.data[i].value;
          const review = await this.$api.review.get(this.estate.id, user.split(":")[1]);
          this.reviewObjs.push(review.data);
          this.reviewObjs[i].rating = parseFloat(this.reviewObjs[i].rating);
          this.reviewObjs[i].likes = reviewedUsers.data[i].score;
          this.calcStats(this.reviewObjs[i]);
        }
      } catch (err) {
        console.error(err);
      }
    },
    calcStats(review) {
      if (review.price) {
        this.calPriceStats(review.price);
      }
      if (review.contract) {
        this.calContractStats(review.contract);
      }
      if (review.kindness) {
        this.calKindnessStats(review.kindness);
      }
      this.calPercentage();
    },
    calPercentage() {
      if (this.price.count > 0) {
        this.toPercentage(this.price);
      }
      if (this.kindness.count > 0) {
        this.toPercentage(this.kindness);
      }
      if (this.contract.count > 0) {
        this.toPercentage(this.contract);
      }
    },
    calPriceStats(price) {
      this.price.count += 1;
      for (let i = 0; i < this.price.fields.length; i++) {
        if (price === this.price.fields[i]) this.price.stats[i]++;
      }
    },
    calContractStats(contract) {
      this.contract.count += 1;
      if (contract === true) {
        this.contract.stats[0]++;
      } else {
        this.contract.stats[1]++;
      }
    },
    calKindnessStats(kindness) {
      this.kindness.count += 1;
      for (let i = 0; i < this.kindness.fields.length; i++) {
        if (kindness === this.kindness.fields[i]) this.kindness.stats[i]++;
      }
    },
    toPercentage(data) {
      for (let i = 0; i < data.stats.length; i++) {
        data.stats[i] = (data.stats[i] / data.count) * 100;
      }
    },
    gotoHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
