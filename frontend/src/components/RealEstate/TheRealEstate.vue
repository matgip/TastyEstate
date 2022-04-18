<template>
  <div>
    <real-estate-layout v-if="Object.keys(estate).length !== 0">
      <images slot="REimg" :estateId="estate.id" />
      <image-upload slot="REimgUpload" :estateId="estate.id" />
      <estate-title slot="REName" :placeName="estate.place_name" />
      <stars slot="REStars" :stars="stars" :likes="likes" />
      <all-reviews-btn slot="REALLReviews" />
      <estate-info slot="REInfo" :estateInfo="estate" />
    </real-estate-layout>
  </div>
</template>

<script>
import RealEstateLayout from "@/layouts/RealEstateLayout.vue";
import Images from "@/components/RealEstate/Images.vue";
import ImageUpload from "@/components/RealEstate/ImageUpload.vue";
import EstateTitle from "@/components/RealEstate/EstateTitle.vue";
import Stars from "@/components/RealEstate/Stars.vue";
import AllReviewsBtn from "@/components/RealEstate/ReviewsBtn.vue";
import EstateInfo from "@/components/RealEstate/EstateInfo.vue";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
      stars: "GET_STARS",
      likes: "GET_LIKES",
    }),
  },
  components: {
    RealEstateLayout,
    Images,
    ImageUpload,
    EstateTitle,
    Stars,
    AllReviewsBtn,
    EstateInfo,
  },
};
</script>
