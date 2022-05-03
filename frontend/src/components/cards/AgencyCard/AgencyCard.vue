<!-- @format -->

<template>
  <div class="agency-card">
    <span><agency-images :agencyId="agency.id" /> </span>
    <span>
      <h3 class="agency-title"><agency-title :placeName="agency.place_name" /></h3>
      <div class="agency-divider"></div>
      <p class="agency-stars"><agency-stars :stars="agency.stars" :likes="agency.likes" /></p>
      <p class="agency-info"><agency-info :agencyInfo="agency" /></p>
      <div class="agency-divider"></div>
      <p class="agency-review"><reviews-btn /></p>
    </span>
    <!-- <image-upload slot="agency-image-upload" :agencyId="agency.id" /> -->
  </div>
</template>

<script>
import AgencyImages from "./components/AgencyImages.vue";
// import ImageUpload from "@/components/RealAgency/ImageUpload.vue";
import AgencyTitle from "./components/AgencyTitle.vue";
import AgencyStars from "./components/AgencyStars.vue";
import ReviewsBtn from "./components/AgencyReviewsBtn.vue";
import AgencyInfo from "./components/AgencyInfo.vue";

export default {
  components: {
    AgencyImages,
    // ImageUpload,
    AgencyTitle,
    AgencyStars,
    AgencyInfo,
    ReviewsBtn,
  },

  props: {
    // stars: {
    //   type: Number,
    //   required: true,
    //   validator: function(value) {
    //     return value >= 0;
    //   },
    // },
    // },
    agency: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.agency-card {
  margin: 16px 15px;
  display: flex;
}

.agency-title {
  margin: 4px 8px;
}

.agency-stars {
  margin: 4px 8px;
  font-size: 12px;
}

.agency-info {
  margin: 8px 8px;
  font-size: 12px;
}

.agency-review {
  margin: 4px 8px;
  font-size: 12px;
}

.agency-divider {
  border-top: 1px solid #e0e0e0;
  border-radius: 0;
  margin: 4px 4px;
}

.v-application p {
  margin-bottom: 0px;
}
</style>
