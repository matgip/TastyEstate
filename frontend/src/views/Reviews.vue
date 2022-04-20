<template>
  <div class="wrapper">
    <div>
      <v-divider />

      <v-container>
        <v-row>
          <v-col v-for="stat in stats" :key="stat.title">
            <base-bar-graph
              :key="stat.count"
              :data="stat.data"
              :categories="stat.categories"
              :title="stat.title"
              :colors="stat.colors"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="review-btns">
      <base-button
        :style="btnStyl"
        :btn-props="btnProps"
        :icon-props="iconProps"
        :onClick="handleLikeEstate"
        :icon="'fas fa-heart'"
        :button="'좋아요'"
      />
      <review-button />
    </div>

    <tabs :onclick="changeOrder" />

    <div v-for="(review, i) in currReviews" :key="i">
      <user-review :review="review" @like-review="handleLikeReview" />
    </div>

    <reviews-pagenation :page="page" :total-count="totalCount" />
  </div>
</template>

<script>
import BaseBarGraph from "../common/BaseBarGraph.vue";
import BaseButton from "../common/BaseButton.vue";
import ReviewButton from "@/components/Reviews/ReviewDiag/Review.vue";

import Tabs from "@/components/Reviews/UsersReview/Tabs.vue";

import UserReview from "../components/Reviews/UsersReview/UserReview.vue";
import ReviewsPagenation from "@/components/Reviews/UsersReview/ReviewsPagenation.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    BaseBarGraph,
    BaseButton,
    ReviewButton,
    Tabs,
    UserReview,
    ReviewsPagenation,
  },

  data: () => ({
    page: 0,
    orderBy: "like",
    stats: [
      {
        count: 0,
        data: [0, 0, 0, 0, 0],
        name: "price",
        title: "가격",
        colors: ["#BA68C8"],
        fields: ["veryCheap", "cheap", "avgPrice", "expensive", "veryExpensive"],
        categories: ["10% 이상 쌈", "5~10% 더 쌈", "평균 가격", "5~10% 더 비쌈", "10% 이상 비쌈"],
      },
      {
        count: 0,
        data: [0, 0, 0, 0, 0],
        name: "kindness",
        title: "친절함",
        colors: ["#4DD0E1"],
        fields: ["veryKind", "kind", "soso", "unKind", "veryUnkind"],
        categories: ["매우 친절", "친절", "보통", "불친절", "매우 불친절"],
      },
      {
        count: 0,
        data: [0, 0],
        name: "contract",
        title: "계약률",
        colors: ["#81C784"],
        categories: ["여기서 계약했어요", "여기서 계약 안했어요"],
        fields: ["true", "false"],
      },
    ],
    reviews: {
      like: [],
      time: [],
    },
    // Vuetify CSS Style & Props
    btnStyl: {
      margin: "34px 18px",
    },
    btnProps: {
      color: "deep-orange",
      outlined: true,
      rounded: true,
    },
    iconProps: {
      left: true,
    },
  }),

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
    }),

    currReviews() {
      return this.reviews[this.orderBy];
    },

    totalCount() {
      return this.reviews[this.orderBy].length;
    },
  },

  async mounted() {
    this.page = 1;
    const allRange = "0~-1";
    this.clear();
    await this.makeReviews(allRange);
    this.$store.subscribe(async (mutation) => {
      if (mutation.type === "UPDATE_ESTATE") {
        this.clear();
        await this.makeReviews(allRange);
      }
    });
  },

  methods: {
    handleLikeEstate() {
      this.$store.dispatch("updateLikes", { estateId: this.estate.id, userId: this.user.id });
    },

    async handleLikeReview(userId) {
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

        await this.$api.reviewsByLike.put({
          baseId: this.estate.id,
          data: { user: userId, count: 1 },
        });
      } catch (err) {
        console.error(err);
      }
    },

    async makeReviews(queryRange) {
      try {
        if (this.estate === undefined || this.estate.id === undefined) {
          // When page is refreshed...
          this.gotoHome();
          return;
        }

        const mapUserLikeCnt = new Map();
        const reviewsByLike = await this.$api.reviewsByLike.get({
          baseId: this.estate.id,
          range: queryRange,
        });

        reviewsByLike.data.forEach(async (d, i) => {
          const userId = d.value.split(":")[1];
          const likeCnt = d.score;
          mapUserLikeCnt.set(`user:${userId}`, likeCnt);

          const resp = await this.$api.review.get({
            baseId: this.estate.id,
            subIds: [userId],
          });
          const review = resp.data;
          review.userId = userId;
          review.likes = likeCnt;
          review.rating = parseFloat(review.rating);

          this.reviews["like"].push(review);
          // Calculate review statistics
          this.calcStats(this.reviews["like"][i]);
        });

        const reviewsByTime = await this.$api.reviewsByTime.get({
          baseId: this.estate.id,
          range: queryRange,
        });

        reviewsByTime.data.forEach(async (d) => {
          const userId = d.value.split(":")[1];

          const resp = await this.$api.review.get({
            baseId: this.estate.id,
            subIds: [userId],
          });
          const review = resp.data;
          review.userId = userId;
          review.likes = mapUserLikeCnt.get(`user:${userId}`);
          review.rating = parseFloat(review.rating);

          this.reviews["time"].push(review);
        });
      } catch (err) {
        console.error(err);
      }
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

    changeOrder(event) {
      this.orderBy = event.currentTarget.id;
    },

    clear() {
      this.reviews["like"] = [];
      this.reviews["time"] = [];
      for (let stat of this.stats) {
        stat.count = 0;
        stat.data.fill(0, 0, stat.fields.length);
      }
    },
  },
};
</script>

<style>
.review-btns {
  display: flex;
}
</style>
