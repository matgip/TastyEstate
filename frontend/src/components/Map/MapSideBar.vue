<template>
  <div id="map__sidebar">
    <v-navigation-drawer :key="estate.id" class="map__sidebar" v-bind="navbarProps" :value="drawer">
      <RealEstate />
    </v-navigation-drawer>
  </div>
</template>

<script>
import RealEstate from "@/components/RealEstate/RealEstate.vue";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
    drawer() {
      return Object.keys(this.estate).length !== 0;
    },
  },
  data() {
    return {
      // Vuetify CSS style props
      navbarProps: {
        bottom: true,
        width: 360,
      },
    };
  },
  components: {
    RealEstate,
  },
};
</script>

<style scoped>
.map__sidebar {
  position: absolute;
  z-index: 2;
}
</style>
