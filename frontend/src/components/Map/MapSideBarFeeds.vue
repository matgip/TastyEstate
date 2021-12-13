<template>
  <div>
    <v-card>
      <v-img height="250" src=""></v-img>
      <v-card-title>{{ estate.place_name }}</v-card-title>
      <v-card-subtitle>
        <div>{{ estate.address_name }}</div>
        <div>{{ estate.phone }}</div>
      </v-card-subtitle>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            4.5 (413)
          </div>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        Explanation of this Real Estate....
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters({
      estate: "getSelectedEstate",
    }),
  },
};
</script>
