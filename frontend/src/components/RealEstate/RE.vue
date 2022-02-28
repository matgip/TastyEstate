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
import { mapGetters } from "vuex";
import RELayout from "./RELayout.vue";
import REImgs from "./REImgs.vue";
import REImgUpload from "./REImgUpload.vue";
import REName from "./REName.vue";
import REStars from "./REStars.vue";
import RELikes from "./RELikes.vue";
import REReview from "../Review/Review.vue";
import REAllReviews from "./REAllReviews.vue";
import REInfos from "./REInfos.vue";

import store from "@/store";

export default {
  mounted() {
    store.subscribe((mutation) => {
      if (mutation.type == "updateSelected") {
        store.dispatch("getLikes", this.estate.id);
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
      estate: "getSelected",
      user: "getUser",
      stars: "getStars",
      likes: "getLikes",
    }),
  },
  methods: {
    onLikeBtnClicked() {
      store.dispatch("updateLikes", { estateID: this.estate.id, userID: this.user.id });
    },
  },
};
</script>
