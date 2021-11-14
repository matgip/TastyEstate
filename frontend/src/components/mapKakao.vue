<template>
  <div id="map"></div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      // Two arguments for creating map
      // 1. container: HTML element to insert Kakao map
      // 2. options  : Extra map options to set kakao map
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      // Create map with HTML element and options
      this.map = new kakao.maps.Map(container, options);

      // Add a map type to display terrain information on the map
      this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

      // Creates a map type control that can switch map types between normal maps and skyview
      const mapTypeControl = new kakao.maps.MapTypeControl();

      // kakao.maps.ControlPosition defines where the control will be displayed, TOPRIGHT means top right
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // Creates a zoom control to control the zoom in and out of the map
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
