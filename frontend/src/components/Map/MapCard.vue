<template>
  <div>
    <v-card v-if="Object.keys(estate).length !== 0">
      <MapCardImageUpload v-bind:estateID="estate.id" />

      <v-card-title>{{ estate.place_name }}</v-card-title>

      <MapCardRating v-bind:rating="4.9" v-bind:likes="512" />

      <v-divider class="mx-4" />

      <v-card-text>
        <MapCardLikes v-bind:likes="512" />
        <MapCardEval />
      </v-card-text>

      <v-divider class="mx-4" />

      <MapCardEstateInfo v-bind:estateInfo="estate" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MapCardImageUpload from "./MapCardImageUpload.vue";
import MapCardRating from "./MapCardRating.vue";
import MapCardLikes from "./MapCardLikes.vue";
import MapCardEval from "./MapCardEval.vue";
import MapCardEstateInfo from "./MapCardEstateInfo.vue";

export default {
  components: {
    MapCardImageUpload,
    MapCardRating,
    MapCardLikes,
    MapCardEval,
    MapCardEstateInfo,
  },
  computed: {
    ...mapGetters({
      estate: "getSelectedEstate",
    }),
  },
};
</script>
