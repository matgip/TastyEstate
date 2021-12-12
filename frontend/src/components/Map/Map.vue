<template>
  <div id="mapcontainer">
    <MapSideBar />
    <MapKakao />
  </div>
</template>

<script>
import MapSideBar from "./MapSideBar.vue";
import MapKakao from "./MapKakao.vue";

export default {
  components: {
    MapSideBar,
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
