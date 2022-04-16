<template>
  <div id="mapview">
    <div id="map__sidebar">
      <SideBar />
    </div>
  </div>
</template>

<script>
import SideBar from "./MapSideBar.vue";

import MapKakao from "@/api/map/kakao";

export default {
  async mounted() {
    await this.initMap();
  },
  methods: {
    async initMap() {
      if (!this.map) {
        const map = new MapKakao();
        await map.mount("mapview");
        this.map = map;
      }
    },
  },
  data() {
    return {
      map: null,
    };
  },
  components: {
    SideBar,
  },
};
</script>

<style scoped>
#mapview {
  width: 100%;
  height: calc(100vh - 64px);
}

@media screen and (max-width: 768px) {
  #mapview {
    height: 700px;
  }
}
</style>
