<!-- @format -->

<template>
  <div id="map_container">
    <div id="map_test_container"></div>
    <div id="mapview"></div>
  </div>
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
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY;
      document.head.appendChild(script);
    }
    // this.$store.commit("updateKakaoMap", window.map);
    // this.$store.subscribe((mutation) => {
    //   if (mutation.type == "updateSelectedEstate") {
    //     const estate = this.$store.getters.getSelectedEstate;
    //     const position = new kakao.maps.LatLng(estate.y, estate.x);
    //     window.map.setLevel(3);
    //     window.map.setCenter(position);

    //     const marker = new kakao.maps.Marker({
    //       position: position,
    //       title: estate.place_name,
    //     });
    //     marker.setMap(window.map);
    //   }
    // });
  },
  methods: {
    initMap() {
      
      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      
      // 마커들의 정보를 담고 있는 place (중복 방지)
      window.places = new Array();

      const container = document.getElementById("mapview");
      const options = {
        center: new kakao.maps.LatLng(37.2579324408187, 127.059981890576),
        level: 5,
      };
      window.map = new kakao.maps.Map(container, options);

      // Display terrain information on the map
      window.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

      // Switch map types between normal maps and skyview
      const mapTypeControl = new kakao.maps.MapTypeControl();
      window.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // Control the zoom in and out of the map
      const zoomControl = new kakao.maps.ZoomControl();
      window.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // Marker cluster
      var clusterer = new kakao.maps.MarkerClusterer({
        map: window.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 5, // 클러스터 할 최소 지도 레벨
      });

      // 장소검색 참고 : https://apis.map.kakao.com/web/sample/categoryFromBounds/
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places(window.map);

      kakao.maps.event.addListener(window.map, "dragend", scanAgency);
      kakao.maps.event.addListener(window.map, "zoom_changed", scanAgency);
      
      function scanAgency() {
        console.log("scan agency");
        var level = window.map.getLevel();
        var latlng = window.map.getCenter();
        var message = "<p>레벨" + level + "</p><br />";
        message += "<p>중심 좌표 : 위도 " + latlng.getLat() + ", 경도 " + latlng.getLng();
        var resultDiv = document.getElementById("map_test_container");
        resultDiv.innerHTML = message;
        if (level < 5) {
          ps.categorySearch("AG2", placesSearchCallback, { useMapBounds: true });
        }
      }
      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCallback(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          data.forEach(d => displayMarker(d));
          if (pagination.hasNextPage) pagination.nextPage();
        }
      }

      function displayMarker(place) {
        if( window.places[place.id] == null) {
          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(place.y, place.x),
          });
          window.places[place.id] = place;
          clusterer.addMarker(marker);

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                "</div>"
            );
            infowindow.open(window.map, marker);
          });
        }

      }
    },
    
  },
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

