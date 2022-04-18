<template>
  <div>
    <real-estate-layout v-if="Object.keys(estate).length !== 0">
      <images slot="estate-image" :estateId="estate.id" />
      <image-upload slot="estate-image-upload" :estateId="estate.id" />
      <estate-title slot="estate-title" :placeName="estate.place_name" />
      <estate-stars slot="estate-stars" :stars="stars" :likes="likes" />
      <all-reviews-btn slot="estate-review-btn" />
      <estate-info slot="estate-info" :estateInfo="estate" />
    </real-estate-layout>
  </div>
</template>

<script>
import RealEstateLayout from "@/layouts/RealEstateLayout.vue";
import Images from "@/components/RealEstate/Images.vue";
import ImageUpload from "@/components/RealEstate/ImageUpload.vue";
import EstateTitle from "@/components/RealEstate/EstateTitle.vue";
import EstateStars from "@/components/RealEstate/EstateStars.vue";
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
    EstateStars,
    AllReviewsBtn,
    EstateInfo,
  },
};
</script>
