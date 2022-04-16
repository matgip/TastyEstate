<template>
  <div id="mapview"></div>
</template>

<script>
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
