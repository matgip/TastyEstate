<template>
    <div id="mapview"></div>
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
#mapview {
  width: 100%;
  height: calc(100vh - 64px);
}
</style>
