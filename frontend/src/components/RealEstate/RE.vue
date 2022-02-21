<template>
  <div>
    <RELayout v-if="Object.keys(estate).length !== 0">
      <REImgs slot="REimg" :estateID="estate.id" />
      <REImgUpload slot="REimgUpload" :estateID="estate.id" />
      <REName slot="REName" :placeName="estate.place_name" />
      <REStars slot="REStars" :stars="stars" :likes="likes" />
      <RELikes slot="RELikes" :likes="likes" @likeBtnClicked="updateLikes" />
      <REReview slot="REReview" />
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
import REReview from "./REReview.vue";
import REAllReviews from "./REAllReviews.vue";
import REInfos from "./REInfos.vue";

import api from "@/api/service.js";
import store from "@/store";

export default {
  mounted() {
    store.subscribe((mutation) => {
      if (mutation.type == "updateSelected") {
        this.updateLikes();
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
      stars: "getStars",
      likes: "getLikes",
    }),
  },
  methods: {
    async updateLikes() {
      try {
        const resp = await this.getLikesDB(this.estate.id);
        store.commit("updateLikes", resp.data.likes);
      } catch (err) {
        console.log(err);
      }
    },
    async getLikesDB(reID) {
      return await api.likes.getLikes(reID);
    },
  },
};
</script>
