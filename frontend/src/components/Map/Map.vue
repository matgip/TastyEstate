<template>
  <div id="mapcontainer" class="wrapper">
    <div class="space" />

    <MapSearch />
    <RealEstate />
    <MapKakao />
  </div>
</template>

<script>
import MapSearch from "./MapSearch.vue";
import RealEstate from "../RealEstate/RealEstate.vue";
import MapKakao from "./MapKakao.vue";

export default {
  components: {
    MapSearch,
    RealEstate,
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
