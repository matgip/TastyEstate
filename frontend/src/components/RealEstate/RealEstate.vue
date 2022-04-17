<template>
  <div>
    <RELayout v-if="Object.keys(estate).length !== 0">
      <Images slot="REimg" :estateId="estate.id" />
      <ImageUpload slot="REimgUpload" :estateId="estate.id" />
      <Title slot="REName" :placeName="estate.place_name" />
      <Stars slot="REStars" :stars="stars" :likes="likes" />
      <LikeButton slot="RELikes" :likes="likes" @likeBtnClicked="onLikeBtnClicked" />
      <ReviewButton slot="REReview" :placeName="estate.place_name" />
      <AllReviewsBtn slot="REALLReviews" />
      <EstateInfo slot="REInfo" :estateInfo="estate" />
    </RELayout>
  </div>
</template>

<script>
import RELayout from "@/layouts/RealEstateLayout.vue";
import Images from "@/components/RealEstate/Images.vue";
import ImageUpload from "@/components/RealEstate/ImageUpload.vue";
import Title from "@/components/RealEstate/Title.vue";
import Stars from "@/components/RealEstate/Stars.vue";
import LikeButton from "@/components/RealEstate/LikeButton.vue";
import ReviewButton from "../../views/Review.vue";
import AllReviewsBtn from "@/components/RealEstate/AllReviewsBtn.vue";
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
  methods: {
    onLikeBtnClicked() {
      this.$store.dispatch("updateLikes", { estateId: this.estate.id, userId: this.user.id });
    },
  },
  components: {
    RELayout,
    Images,
    ImageUpload,
    Title,
    Stars,
    LikeButton,
    ReviewButton,
    AllReviewsBtn,
    EstateInfo,
  },
};
</script>
