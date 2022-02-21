<template>
  <div>
    <RELayout v-if="Object.keys(estate).length !== 0">
      <REImgs slot="REimg" :estateID="estate.id" />
      <REImgUpload slot="REimgUpload" :estateID="estate.id" />
      <REName slot="REName" :placeName="estate.place_name" />
      <RERatings slot="RERatings" :rating="rating" :likes="likes" />
      <RELikes slot="RELikes" :likes="likes" @likeBtnClicked="updateLikes" />
      <REFeeds slot="REFeeds" />
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
import RERatings from "./RERatings.vue";
import RELikes from "./RELikes.vue";
import REFeeds from "./REFeeds.vue";
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
    RERatings,
    RELikes,
    REFeeds,
    REInfos,
  },
  computed: {
    ...mapGetters({
      estate: "getSelected",
      rating: "getRating",
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
