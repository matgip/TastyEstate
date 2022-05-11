<template>
  <div>
    <div>
      <v-divider />

      <v-container>
        <v-row>
          <v-col v-for="stat in stats" :key="stat.title">
            <base-bar-graph :key="stat.count" :stat="stat" />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="review-btns">
      <base-button
        :style="btnStyl"
        :btn-props="btnProps"
        :icon-props="iconProps"
        :on-click="onLikeEstate"
        :icon="'fas fa-heart'"
        :button="'좋아요'"
      />
      <review-dialog-button />
    </div>

    <v-tabs :style="tabsStyle" v-bind="tabsProps">
      <v-tab id="like" @click="onChangeOrder">좋아요 순</v-tab>
      <v-tab id="time" @click="onChangeOrder">최신 순</v-tab>
    </v-tabs>

    <div v-for="(review, i) in currReviews" :key="i">
      <review :review="review" @like-review="onLikeReview" />
    </div>

    <v-pagination v-bind="paginationProps" v-model="page" :length="pageCount" :total-visible="7" />
  </div>
</template>

<script>
import BaseBarGraph from "../common/BaseBarGraph.vue";
import BaseButton from "../common/BaseButton.vue";
import ReviewDialogButton from "@/components/Review/ReviewDialogButton.vue";
import Review from "../components/Review/Review.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    BaseBarGraph,
    BaseButton,
    ReviewDialogButton,
    Review,
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
        color: "#BA68C8",
        fields: ["veryCheap", "cheap", "avgPrice", "expensive", "veryExpensive"],
        categories: ["10% 이상 쌈", "5~10% 더 쌈", "평균 가격", "5~10% 더 비쌈", "10% 이상 비쌈"],
      },
      {
        count: 0,
        data: [0, 0, 0, 0, 0],
        name: "kindness",
        title: "친절함",
        color: "#4DD0E1",
        fields: ["veryKind", "kind", "soso", "unKind", "veryUnkind"],
        categories: ["매우 친절", "친절", "보통", "불친절", "매우 불친절"],
      },
      {
        count: 0,
        data: [0, 0],
        name: "contract",
        title: "계약률",
        color: "#81C784",
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
    tabsStyle: {
      margin: "0px 18px",
    },
    tabsProps: {
      left: true,
      color: "deep-orange",
    },
    paginationProps: {
      color: "deep-orange",
      circle: true,
      class: "mt-10",
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

    pageCount() {
      const reviewCnt = this.reviews[this.orderBy].length;
      if (reviewCnt <= 7) return 1;
      return Math.trunc(reviewCnt / 7 + 1);
    },
  },

  async mounted() {
    this.page = 1;
    const allRange = "0~-1";
    await this._makeReview(allRange);

    this.$store.subscribe(async (mutation) => {
      if (mutation.type === "UPDATE_ESTATE") {
        this._clear();
        await this._makeReview(allRange);
      }
    });
  },

  destroyed() {
    this._clear();
  },

  methods: {
    async onLikeEstate() {
      try {
        const resp = await this.$api.likes.put(this.estate.id, { user_id: this.user.id });
        if (resp.data.result === "already-added") {
          alert("이미 좋아요를 누르셨습니다.");
          return;
        }
        if (resp.data.result === "success") {
          alert("이 부동산을 좋아합니다.");
        }
      } catch (err) {
        console.error(err);
      }
    },

    async onLikeReview(userId) {
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

        await this.$api.reviewsByLike.put({
          baseId: this.estate.id,
          data: { user: userId, count: 1 },
        });
        if (resp.data.result === "success") {
          alert("이 리뷰를 좋아합니다.");
        }
      } catch (err) {
        console.error(err);
      }
    },

    onChangeOrder(event) {
      this.orderBy = event.currentTarget.id;
    },

    async _makeReview(queryRange) {
      try {
        if (this.estate === undefined || this.estate.id === undefined) {
          // When page is refreshed...
          this._gotoHome();
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
          this._calcStats(this.reviews["like"][i]);
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

    _calcStats(review) {
      this.stats.forEach((stat) => {
        this._addStat(stat, review[stat.name]);
        this._replacePercentage(stat);
      });
    },

    _addStat(stat, fieldToFind) {
      if (!fieldToFind) return;
      stat.count += 1;

      const matchedIndex = stat.fields.findIndex((field) => field === fieldToFind);
      stat.data[matchedIndex]++;
    },

    _replacePercentage(stat) {
      if (stat.count === 0) return;
      for (let i = 0; i < stat.data.length; i++) {
        stat.data[i] = Math.floor((stat.data[i] / stat.count) * 100);
      }
      console.log(stat.data);
    },

    _gotoHome() {
      this.$router.push({ path: "/" });
    },

    _clear() {
      this.reviews["like"] = [];
      this.reviews["time"] = [];
      this.stats.forEach((stat) => {
        stat.count = 0;
        stat.data.fill(0, 0, stat.data.length);
      });
    },
  },
};
</script>

<style>
.review-btns {
  display: flex;
}
</style>
