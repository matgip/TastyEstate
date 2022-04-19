<template>
  <div class="wrapper">
    <div>
      <v-divider />

      <v-container>
        <v-row>
          <v-col>
            <price-graph :key="stats[0].count" :data="stats[0].data" />
          </v-col>

          <v-col>
            <kindness-graph :key="stats[1].count" :data="stats[1].data" />
          </v-col>

          <v-col>
            <contract-graph :key="stats[2].count" :data="stats[2].data" />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div id="rvws__btn">
      <estate-like-btn @like-estate="handleEventEstateLike" />
      <submit-rvw-btn />
    </div>

    <tabs @order-by-like="toLikeOrder" @order-by-time="toTimeOrder" />

    <div v-for="(review, i) in reviews" :key="i">
      <v-card>
        <v-divider />

        <v-card-text>
          <user-profile :avatar-url="review.avatar" :nickname="review.nickname" :timestamp="review.time" />
        </v-card-text>

        <v-card-text>
          <v-row align="center">
            <review-stars :rating="review.rating" />
            <review-likes :likes="review.likes" :user-id="review.userId" @rvwLikeBtnClicked="addLike" />
          </v-row>
        </v-card-text>

        <v-card-title>
          <review-title :title="review.title" />
        </v-card-title>

        <v-card-text>
          <review-contents :text="review.text" />
        </v-card-text>

        <v-divider />
      </v-card>
    </div>

    <reviews-pagenation :page="page" :total-count="totalCount" />
  </div>
</template>

<script>
import KindnessGraph from "@/components/AllReviews/BarGraph/KindnessGraph.vue";
import PriceGraph from "@/components/AllReviews/BarGraph/PriceGraph.vue";
import ContractGraph from "@/components/AllReviews/BarGraph/ContractGraph.vue";

import EstateLikeBtn from "@/components/AllReviews/UsersReview/EstateLikeBtn.vue";
import SubmitRvwBtn from "@/components/AllReviews/ReviewDiag/TheReview.vue";

import Tabs from "@/components/AllReviews/UsersReview/Tabs.vue";

import UserProfile from "@/components/AllReviews/UsersReview/UserProfile.vue";
import ReviewStars from "@/components/AllReviews/UsersReview/ReviewStars.vue";
import ReviewLikes from "@/components/AllReviews/UsersReview/ReviewLikes.vue";
import ReviewTitle from "@/components/AllReviews/UsersReview/ReviewTitle.vue";
import ReviewContents from "@/components/AllReviews/UsersReview/ReviewContents.vue";
import ReviewsPagenation from "@/components/AllReviews/UsersReview/ReviewsPagenation.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    // Graphs
    KindnessGraph,
    PriceGraph,
    ContractGraph,
    // Buttons
    EstateLikeBtn,
    SubmitRvwBtn,
    // Review order table
    Tabs,
    // Review
    UserProfile,
    ReviewStars,
    ReviewLikes,
    ReviewTitle,
    ReviewContents,
    ReviewsPagenation,
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
        fields: ["true", "false"],
      },
    ],
    orderByLikes: [],
    orderByTimes: [],
  }),

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
      likes: "GET_LIKES",
    }),

    reviews() {
      return this.order === "like" ? this.orderByLikes : this.orderByTimes;
    },

    totalCount() {
      return this.reviews.length;
    },
  },

  async mounted() {
    this.clear(); // Must clear the data to calculate correctly
    this.page = 1;
    const allRange = "0~-1";
    await this.constructReviews(allRange);
    this.$store.subscribe((mutation) => {
      if (mutation.type === "UPDATE_ESTATE") {
        this.clear(); // Must clear the data to calculate correctly
        this.constructReviews(allRange);
      }
    });
  },

  methods: {
    handleEventEstateLike() {
      this.$store.dispatch("updateLikes", { estateId: this.estate.id, userId: this.user.id });
    },

    async constructReviews(queryRange) {
      try {
        if (this.estate === undefined || this.estate.id === undefined) {
          // When page is refreshed...
          this.gotoHome();
          return;
        }
        const userLike = new Map();
        const likesOrder = await this.$api.reviewLikesOrder.get({
          baseId: this.estate.id,
          range: queryRange,
        });
        const timeOrder = await this.$api.reviewTimeOrder.get({
          baseId: this.estate.id,
          range: queryRange,
        });
        for (let d of likesOrder.data) {
          const userId = d.value.split(":")[1];
          const likes = d.score;
          userLike.set(`user:${userId}`, likes);
          const review = await this.$api.review.get({
            baseId: this.estate.id,
            subIds: [userId],
          });
          this.orderByLikes.push(this.preProcessReview(review.data, userId, likes));
          this.calcStats(this.orderByLikes[likesOrder.data.indexOf(d)]);
        }
        for (let d of timeOrder.data) {
          const userId = d.value.split(":")[1];
          const review = await this.$api.review.get({
            baseId: this.estate.id,
            subIds: [userId],
          });
          this.orderByTimes.push(this.preProcessReview(review.data, userId, userLike.get(`user:${userId}`)));
        }
      } catch (err) {
        console.error(err);
      }
    },

    preProcessReview(review, userId, likes) {
      review.userId = userId; // To find user to increase review likes count if like button clicked
      review.likes = likes;
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
      this.orderByLikes = [];
      this.orderByTimes = [];
      this.stats[0].count = 0;
      this.stats[1].count = 0;
      this.stats[2].count = 0;
      this.stats[0].data = [0, 0, 0, 0, 0];
      this.stats[1].data = [0, 0, 0, 0, 0];
      this.stats[2].data = [0, 0];
    },

    async addLike(userId) {
      try {
        const resp = await this.$api.reviewUserLikes.post({
          baseId: this.estate.id,
          subIds: [userId],
          data: {
            user: this.user.id,
          },
        });
        if (resp.data.result === "already-added") {
          alert("이미 이 리뷰를 좋아합니다.");
          return;
        }
        if (resp.data.result === "success") {
          alert("이 리뷰를 좋아합니다.");
        }
        await this.$api.reviewLikesOrder.put({
          baseId: this.estate.id,
          data: { user: userId, count: 1 },
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
#rvws__btn {
  display: flex;
}
</style>
