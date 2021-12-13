<template>
  <div id="sidebar">
    <v-navigation-drawer absolute permanent left height="100vh" width="40vh">
      <Search />
      <Card />
    </v-navigation-drawer>
  </div>
</template>

<script>
import Search from "../Search/Search.vue";
import Card from "../Card/Card.vue";

export default {
  components: {
    Search,
    Card,
  },
};
</script>

<style scoped>
#sidebar {
  z-index: 1;
}
</style>
