<template>
  <div>
    <v-card v-if="Object.keys(estate).length !== 0">
      <MapCardFileUpload />
      <v-card-title>{{ estate.place_name }}</v-card-title>

      <!-- Likes and Stars -->
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :value="4.5" size="18" color="amber" dense readonly half-increments></v-rating>
          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-text>
        <v-btn class="ma-2" color="deep-orange" x-small outlined rounded>
          <v-icon left x-small>
            fas fa-heart
          </v-icon>
          좋아요(413)
        </v-btn>

        <v-btn class="ma-2" color="deep-orange" x-small outlined rounded>
          <v-icon left x-small>
            fas fa-edit
          </v-icon>
          평가하기
        </v-btn>
      </v-card-text>

      <v-divider class="mx-4" />

      <!-- Real Estate Detail Infos -->
      <v-card-text>
        <div>
          <v-icon x-small>fas fa-map-marker-alt</v-icon>
          {{ estate.address_name }}
        </div>
        <div>
          <v-icon x-small>fas fa-book</v-icon>
          {{ estate.phone }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MapCardFileUpload from "./MapCardFileUpload.vue";

export default {
  components: {
    MapCardFileUpload,
  },
  computed: {
    ...mapGetters({
      estate: "getSelectedEstate",
    }),
  },
};
</script>
