<template>
  <div id="mapcontainer" class="wrapper">
    <div class="space" />

    <MapSearch />
    <MapCard />
    <MapKakao />
  </div>
</template>

<script>
import MapSearch from "./MapSearch.vue";
import MapCard from "../Card/Card.vue";
import MapKakao from "./MapKakao.vue";

export default {
  components: {
    MapSearch,
    MapCard,
    MapKakao,
  },
};
</script>

<style scoped>
#mapcontainer {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
