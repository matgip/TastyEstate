<template>
  <div class="estate-card" v-if="Object.keys(estate).length !== 0">
    <span><images :estateId="estate.id" /> </span>
    <span>
      <h3 class="estate-title"><estate-title :placeName="estate.place_name" /></h3>
      <div class="estate-divider"></div>
      <p class="estate-stars"><estate-stars :stars="stars" :likes="likes" /></p>
      <p class="estate-info"><estate-info :estateInfo="estate" /></p>
      <div class="estate-divider"></div>
      <p class="estate-review"><reviews-btn /></p>
    </span>
    <!-- <image-upload slot="estate-image-upload" :estateId="estate.id" /> -->
  </div>
</template>

<script>
import Images from "./components/Images.vue";
// import ImageUpload from "@/components/RealEstate/ImageUpload.vue";
import EstateTitle from "./components/EstateTitle.vue";
import EstateStars from "./components/EstateStars.vue";
import ReviewsBtn from "./components/ReviewsBtn.vue";
import EstateInfo from "./components/EstateInfo.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Images,
    // ImageUpload,
    EstateTitle,
    EstateStars,
    ReviewsBtn,
    EstateInfo,
  },

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
      stars: "GET_STARS",
      likes: "GET_LIKES",
    }),
  },
};
</script>

<style>
.estate-card {
  margin: 16px 15px;
  display: flex;
}

.estate-title {
  margin: 4px 8px;
}

.estate-stars {
  margin: 4px 8px;
  font-size: 12px;
}

.estate-info {
  margin: 8px 8px;
  font-size: 12px;
}

.estate-review {
  margin: 4px 8px;
  font-size: 12px;
}

.estate-divider {
  border-top: 1px solid #e0e0e0;
  border-radius: 0;
  margin: 4px 4px;
}

.v-application p {
  margin-bottom: 0px;
}
</style>
