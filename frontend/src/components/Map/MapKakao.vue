<template>
  <div id="map"></div>
</template>

<script>
export default {
  data: () => ({
    map: null,
  }),
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => {
        kakao.maps.load(this.initMap);
      };
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY;
      document.head.appendChild(script);
    }
    this.$store.commit("updateKakaoMap", this.map);
    this.$store.subscribe((mutation) => {
      if (mutation.type == "updateSelectedEstate") {
        const estate = this.$store.getters.getSelectedEstate;
        const position = new kakao.maps.LatLng(estate.y, estate.x);
        this.map.setLevel(3);
        this.map.setCenter(position);

        const marker = new kakao.maps.Marker({
          position: position,
          title: estate.place_name
        });
        marker.setMap(this.map);
      }
    });
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.2579324408187, 127.059981890576),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      // Display terrain information on the map
      this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

      // Switch map types between normal maps and skyview
      const mapTypeControl = new kakao.maps.MapTypeControl();
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // Control the zoom in and out of the map
      const zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
