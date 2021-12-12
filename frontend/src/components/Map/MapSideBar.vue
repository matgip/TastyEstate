<template>
  <div id="sidebar">
    <v-navigation-drawer absolute permanent left height="100vh" width="40vh">
      <MapSideBarSearch />
      <MapSideBarFeeds />
    </v-navigation-drawer>
  </div>
</template>

<script>
import MapSideBarSearch from "./MapSideBarSearch.vue";
import MapSideBarFeeds from "./MapSideBarFeeds.vue";

export default {
  components: {
    MapSideBarSearch,
    MapSideBarFeeds,
  },
};
</script>

<style scoped>
#sidebar {
  z-index: 1;
}
</style>
