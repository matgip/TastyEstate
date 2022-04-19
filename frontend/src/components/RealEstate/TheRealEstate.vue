<template>
  <div class="styled__EstateCard" v-if="Object.keys(estate).length !== 0">
    <span><images :estateId="estate.id" /> </span>
    <span>
      <h3 class="styled__EstTitle"><estate-title :placeName="estate.place_name" /></h3>
      <div class="styled__Divider"></div>
      <p class="styled__EstStar"><estate-stars :stars="stars" :likes="likes" /></p>
      <p class="styled__EstInfo"><estate-info :estateInfo="estate" /></p>
      <div class="styled__Divider"></div>
      <p class="styled__EstReview"><all-reviews-btn /></p>
    </span>
    <!-- <image-upload slot="estate-image-upload" :estateId="estate.id" /> -->
  </div>
</template>

<script>
import Images from "@/components/RealEstate/Images.vue";
// import ImageUpload from "@/components/RealEstate/ImageUpload.vue";
import EstateTitle from "@/components/RealEstate/EstateTitle.vue";
import EstateStars from "@/components/RealEstate/EstateStars.vue";
import AllReviewsBtn from "@/components/RealEstate/ReviewsBtn.vue";
import EstateInfo from "@/components/RealEstate/EstateInfo.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Images,
    // ImageUpload,
    EstateTitle,
    EstateStars,
    AllReviewsBtn,
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
.styled__EstateCard {
  margin: 16px 15px;
  display: flex;
}

.styled__EstTitle {
  margin: 4px 8px;
}

.styled__EstStar {
  margin: 4px 8px;
  font-size: 12px;
}

.styled__EstInfo {
  margin: 8px 8px;
  font-size: 12px;
}

.styled__EstReview {
  margin: 4px 8px;
  font-size: 12px;
}

.styled__Divider {
  border-top: 1px solid #e0e0e0;
  border-radius: 0;
  margin: 4px 4px;
}

.v-application p {
  margin-bottom: 0px;
}
</style>
