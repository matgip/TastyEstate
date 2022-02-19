<template>
  <div>
    <RELayout>
      <REImgs slot="REimg" :estateID="estate.id" />
      <REImgUpload slot="REimgUpload" :estateID="estate.id" />
      <RERatings slot="RERatings" :rating="rating" :likes="likes" />
      <RELikes slot="RELikes" :likes="likes" />
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
import RERatings from "./RERatings.vue";
import RELikes from "./RELikes.vue";
import REFeeds from "./REFeeds.vue";
import REInfos from "./REInfos.vue";

export default {
  components: {
    RELayout,
    REImgs,
    REImgUpload,
    RERatings,
    RELikes,
    REFeeds,
    REInfos,
  },
  computed: {
    ...mapGetters({
      estate: "getSelectedEstate",
      rating: "getRating",
      likes: "getLikes",
    }),
  },
};
</script>
