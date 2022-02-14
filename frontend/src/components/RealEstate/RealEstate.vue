<template>
  <div>
    <v-card v-if="Object.keys(estate).length !== 0">
      <RealEstateImage :estateID="estate.id" />
      <RealEstateImgUpload :estateID="estate.id" />

      <v-card-title>{{ estate.place_name }}</v-card-title>

      <RealEstateRatings :rating="4.9" :likes="512" />

      <v-divider class="mx-4" />

      <v-card-text>
        <RealEstateLikes :likes="512" />
        <RealEstateFeeds />
      </v-card-text>

      <v-divider class="mx-4" />

      <RealEstateInfo :estateInfo="estate" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RealEstateImage from "./RealEstateImage.vue";
import RealEstateImgUpload from "./RealEstateImgUpload.vue";
import RealEstateRatings from "./RealEstateRatings.vue";
import RealEstateLikes from "./RealEstateLikes.vue";
import RealEstateFeeds from "./RealEstateFeeds.vue";
import RealEstateInfo from "./RealEstateInfo.vue";

export default {
  components: {
    RealEstateImage,
    RealEstateImgUpload,
    RealEstateRatings,
    RealEstateLikes,
    RealEstateFeeds,
    RealEstateInfo,
  },
  computed: {
    ...mapGetters({
      estate: "getSelectedEstate",
    }),
  },
};
</script>
