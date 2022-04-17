<template>
  <div class="wrapper">
    <GraphsLayout>
      <PriceGraph :key="stats[0].count" :data="stats[0].data" slot="PriceGraph" />
      <KindnessGraph :key="stats[1].count" :data="stats[1].data" slot="KindnessGraph" />
      <ContractGraph :key="stats[2].count" :data="stats[2].data" slot="ContractGraph" />
    </GraphsLayout>

    <RvwsBtnLayout>
      <EstateLikeBtn slot="RvwsLikeBtn" @estateLikeBtnClicked="updateEstateLikes" />
      <SubmitRvwBtn slot="SubmitRvwBtn" />
    </RvwsBtnLayout>

    <Tabs @orderByLike="toLikeOrder" @orderByTime="toTimeOrder" />

    <AllReviewsLayout v-for="(review, i) in reviews" :key="i">
      <UserProfile slot="UserProfile" :avatarURL="review.avatar" :nickName="review.nickname" :timeStamp="review.time" />
      <Stars slot="Rating" :rating="review.rating" />
      <Likes slot="Likes" :likes="review.likes" :userId="review.userId" @rvwLikeBtnClicked="addLike" />
      <Title slot="Title" :title="review.title" />
      <Content slot="Content" :text="review.text" />
    </AllReviewsLayout>

    <Pagenation :page="page" :totalCount="totalCount" />
  </div>
</template>

<script>
import GraphsLayout from "@/layouts/GraphsLayout.vue";
import KindnessGraph from "@/components/AllReviews/BarGraph/KindnessGraph.vue";
import PriceGraph from "@/components/AllReviews/BarGraph/PriceGraph.vue";
import ContractGraph from "@/components/AllReviews/BarGraph/ContractGraph.vue";

import RvwsBtnLayout from "@/layouts/RvwsBtnLayout.vue";
import EstateLikeBtn from "@/components/AllReviews/UsersReview/EstateLikeBtn.vue";
import SubmitRvwBtn from "@/components/AllReviews/Review/TheReview.vue";

import Tabs from "@/components/AllReviews/UsersReview/Tabs.vue";

import AllReviewsLayout from "@/layouts/AllReviewsLayout.vue";
import UserProfile from "@/components/AllReviews/UsersReview/UserProfile.vue";
import Stars from "@/components/AllReviews/UsersReview/Stars.vue";
import Likes from "@/components/AllReviews/UsersReview/Likes.vue";
import Title from "@/components/AllReviews/UsersReview/Title.vue";
import Content from "@/components/AllReviews/UsersReview/Content.vue";
import Pagenation from "@/components/AllReviews/UsersReview/Pagination.vue";

import { mapGetters } from "vuex";

export default {
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
  methods: {
    updateEstateLikes() {
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
  components: {
    GraphsLayout,
    KindnessGraph,
    PriceGraph,
    ContractGraph,

    RvwsBtnLayout,
    EstateLikeBtn,
    SubmitRvwBtn,

    Tabs,

    AllReviewsLayout,
    UserProfile,
    Stars,
    Likes,
    Title,
    Content,
    Pagenation,
  },
};
</script>
