<template>
  <div id="mapcontainer">
    <MapNavBar />
    <MapKakao />
  </div>
</template>

<script>
import MapNavBar from "./mapNavBar.vue";
import MapKakao from "./mapKakao.vue";

export default {
  components: {
    MapNavBar,
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
