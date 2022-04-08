<template>
  <div class="wrapper">
    <GraphsLayout>
      <PriceGraph :key="stats[0].count" :data="stats[0].data" slot="PriceGraph" />
      <KindnessGraph :key="stats[1].count" :data="stats[1].data" slot="KindnessGraph" />
      <ContractGraph :key="stats[2].count" :data="stats[2].data" slot="ContractGraph" />
    </GraphsLayout>

    <Tabs @orderByLike="toLikeOrder" @orderByTime="toTimeOrder" />

    <ReviewsLayout v-for="(review, i) in reviews" :key="i">
      <UserProfile slot="UserProfile" :avatarURL="review.avatar" :nickName="review.nickname" :timeStamp="review.time" />
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

import Tabs from "./ReviewsTabs.vue";

import ReviewsLayout from "./ReviewsLayout.vue";
import UserProfile from "./ReviewsUserProfile.vue";
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
    Tabs,
    ReviewsLayout,
    UserProfile,
    Stars,
    Likes,
    Title,
    Content,
    Pagenation,
  },
  async mounted() {
    this.page = 1;
    const allRange = "0~-1";
    await this.constructReviews(allRange);
    this.$store.subscribe((mutation) => {
      if (mutation.type === "UPDATE_ESTATE") {
        this.clear();
        this.constructReviews(allRange);
      }
    });
  },
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
    reviews() {
      return this.order === "like" ? this.rvwOrderByLikes : this.rvwOrderByTimes;
    },
    totalCount() {
      return this.reviews.length;
    },
  },
  data: () => ({
    page: 0,
    order: "like",
    stats: [
      {
        name: "price",
        count: 0,
        data: [0, 0, 0, 0, 0],
        fields: ["veryCheap", "cheap", "avgPrice", "expensive", "veryExpensive"],
      },
      {
        name: "kindness",
        count: 0,
        data: [0, 0, 0, 0, 0],
        fields: ["veryKind", "kind", "soso", "unKind", "veryUnkind"],
      },
      {
        name: "contract",
        count: 0,
        data: [0, 0],
        fields: [true, false],
      },
    ],
    rvwOrderByLikes: [],
    rvwOrderByTimes: [],
  }),
  methods: {
    async constructReviews(queryRange) {
      try {
        if (this.estate === undefined || this.estate.id === undefined) {
          // When page is refreshed...
          this.gotoHome();
          return;
        }
        const userLike = new Map();
        const likesOrder = await this.$api.reviewLikesOrder.get(this.estate.id, queryRange);
        const timeOrder = await this.$api.reviewTimeOrder.get(this.estate.id, queryRange);
        for (let d of likesOrder.data) {
          const userId = d.value.split(":")[1];
          const likes = d.score;
          userLike.set(`user:${userId}`, likes);
          const review = await this.$api.review.get(this.estate.id, userId);
          this.rvwOrderByLikes.push(this.preProcessReview(review.data, likes));
          this.calcStats(this.rvwOrderByLikes[likesOrder.data.indexOf(d)]);
        }
        for (let d of timeOrder.data) {
          const userId = d.value.split(":")[1];
          const review = await this.$api.review.get(this.estate.id, userId);
          this.rvwOrderByTimes.push(this.preProcessReview(review.data, userLike.get(`user:${userId}`)));
        }
      } catch (err) {
        console.error(err);
      }
    },
    preProcessReview(review, likes) {
      review.likes = likes;
      review.contract = Boolean(review.contract);
      review.rating = parseFloat(review.rating);
      return review;
    },
    calcStats(review) {
      for (let stat of this.stats) {
        this.calcStatData(stat, review[stat.name]);
        this.toPercentage(stat);
      }
    },
    calcStatData(stat, dataFromDb) {
      if (!dataFromDb) return;
      stat.count += 1;
      for (let field of stat.fields) {
        if (dataFromDb === field) stat.data[stat.fields.indexOf(field)]++;
      }
    },
    toPercentage(stat) {
      if (stat.count === 0) return;
      for (let i = 0; i < stat.data.length; i++) {
        stat.data[i] = ((stat.data[i] / stat.count) * 100).toFixed(2);
      }
    },
    gotoHome() {
      this.$router.push({ path: "/" });
    },
    toLikeOrder() {
      this.order = "like";
    },
    toTimeOrder() {
      this.order = "time";
    },
    clear() {
      this.rvwOrderByLikes = [];
      this.rvwOrderByTimes = [];
      this.stats[0].count = 0;
      this.stats[1].count = 0;
      this.stats[2].count = 0;
      this.stats[0].data = [0, 0, 0, 0, 0];
      this.stats[1].data = [0, 0, 0, 0, 0];
      this.stats[2].data = [0, 0];
    },
  },
};
</script>
