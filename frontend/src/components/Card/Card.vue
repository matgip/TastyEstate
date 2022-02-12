<template>
  <div>
    <v-card v-if="Object.keys(estate).length !== 0">
      <CardImages v-bind:estateID="estate.id" />
      <CardImageUpload v-bind:estateID="estate.id" />

      <v-card-title>{{ estate.place_name }}</v-card-title>

      <CardRating v-bind:rating="4.9" v-bind:likes="512" />

      <v-divider class="mx-4" />

      <v-card-text>
        <CardLikes v-bind:likes="512" />
        <CardEval />
      </v-card-text>

      <v-divider class="mx-4" />

      <CardEstateInfo v-bind:estateInfo="estate" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardImages from "./CardImages.vue";
import CardImageUpload from "./CardImageUpload.vue";
import CardRating from "./CardRating.vue";
import CardLikes from "./CardLikes.vue";
import CardEval from "./CardEval.vue";
import CardEstateInfo from "./CardEstateInfo.vue";

export default {
  components: {
    CardImages,
    CardImageUpload,
    CardRating,
    CardLikes,
    CardEval,
    CardEstateInfo,
  },
  computed: {
    ...mapGetters({
      estate: "getSelectedEstate",
    }),
  },
};
</script>
