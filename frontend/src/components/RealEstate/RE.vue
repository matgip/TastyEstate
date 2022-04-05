<template>
  <div>
    <RELayout v-if="Object.keys(estate).length !== 0">
      <REImgs slot="REimg" :estateID="estate.id" />
      <REImgUpload slot="REimgUpload" :estateID="estate.id" />
      <REName slot="REName" :placeName="estate.place_name" />
      <REStars slot="REStars" :stars="stars" :likes="likes" />
      <RELikes slot="RELikes" :likes="likes" @likeBtnClicked="onLikeBtnClicked" />
      <REReview slot="REReview" :placeName="estate.place_name" />
      <REAllReviews slot="REALLReviews" />
      <REInfos slot="REInfo" :estateInfo="estate" />
    </RELayout>
  </div>
</template>

<script>
import RELayout from "./RELayout.vue";
import REImgs from "./REImgs.vue";
import REImgUpload from "./REImgUpload.vue";
import REName from "./REName.vue";
import REStars from "./REStars.vue";
import RELikes from "./RELikes.vue";
import REReview from "../Review/Review.vue";
import REAllReviews from "./REAllReviews.vue";
import REInfos from "./REInfos.vue";

import { mapGetters } from "vuex";

export default {
  mounted() {
    this.$store.subscribe(async (mutation) => {
      if (mutation.type == "UPDATE_ESTATE") {
        await this.$store.dispatch("getLikes", this.estate.id);
        await this.$store.dispatch("getStars", this.estate.id);
      }
    });
  },
  components: {
    RELayout,
    REImgs,
    REImgUpload,
    REName,
    REStars,
    RELikes,
    REReview,
    REAllReviews,
    REInfos,
  },
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
      stars: "GET_STARS",
      likes: "GET_LIKES",
    }),
  },
  methods: {
    onLikeBtnClicked() {
      this.$store.dispatch("updateLikes", { estateID: this.estate.id, userID: this.user.id });
    },
  },
};
</script>
