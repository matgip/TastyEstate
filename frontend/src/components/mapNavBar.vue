<template>
  <div id="navbar">
    <!-- Navigation Drawer -->
    <v-navigation-drawer absolute permanent left height="100vh" width="40vh">
      <MapSearch />
      <MapFeedCards />
    </v-navigation-drawer>
  </div>
</template>

<script>
import MapSearch from "./mapNavBarSearch.vue";
import MapFeedCards from "./mapNavBarFeedCards.vue";

export default {
  components: {
    MapSearch,
    MapFeedCards,
  },
};
</script>

<style scoped>
#navbar {
  z-index: 1;
}
</style>