<template>
  <div id="map_container">
    <div id="mapview"></div>
  </div>
</template>

<script>
import { $map } from "@/api/map/kakao";

export default {
  data: () => ({}),
  mounted() {
    $map.kakao.loadMap();
  },
  methods: {},
};
</script>

<style scoped>
#map_container {
  width: 100%;
  height: 100%;
}
#mapview {
  width: 100%;
  height: 100%;
}
</style>
