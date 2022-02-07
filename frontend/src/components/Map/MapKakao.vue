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
  },
  methods: {
    initMap() {
      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 마커들의 정보를 담고 있는 place (중복 방지)
      window.places = new Array();

      // 중복 요청 방지
      window.scannedLatlng = new Array();

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

      kakao.maps.event.addListener(window.map, "dragend", scan);
      kakao.maps.event.addListener(window.map, "zoom_changed", scan);

      function searchAgency(lat, lng) {
        if (window.scannedLatlng[lat] == null) {
          window.scannedLatlng[lat] = new Array();
        }

        if (window.scannedLatlng[lat][lng] == null) {
          window.scannedLatlng[lat][lng] = 1;

          console.log("search 위도 " + lat + ", 경도 " + lng);

          ps.categorySearch("AG2", placesSearchCallback, { x: lng, y: lat, radius: 710 });
          // 지도에 표시할 원을 생성합니다
          var circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(lat, lng), // 원의 중심좌표 입니다
            radius: 710, // 미터 단위의 원의 반지름입니다
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: "#FFFFFF", // 선의 색깔입니다
            strokeOpacity: 0.1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: "dashed", // 선의 스타일 입니다
            fillColor: "#FFFFFF", // 채우기 색깔입니다
            fillOpacity: 0.5, // 채우기 불투명도 입니다
          });

          // 지도에 원을 표시합니다
          circle.setMap(window.map);
        } else {
          console.log("not search 위도 " + lat + ", 경도 " + lng);
        }
      }

      function scan() {
        console.log("scan agency");
        var level = window.map.getLevel();
        var latlng = window.map.getCenter();
        var lat = Math.round(latlng.getLat() * 100) / 100;
        var lng = Math.round(latlng.getLng() * 100) / 100;
        var message = "<p>레벨" + level + "</p><br />";
        message += "<p>중심 좌표 : 위도 " + latlng.getLat() + ", 경도 " + latlng.getLng();
        message += "<p>변환 좌표 : 위도 " + lat + ", 경도 " + lng;
        var resultDiv = document.getElementById("map_test_container");
        resultDiv.innerHTML = message;
        if (level < 7) {
          for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
              searchAgency(lat + i / 100, lng + j / 100);
            }
          }
        }
      }
      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCallback(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          data.forEach((d) => displayMarker(d));
          if (pagination.hasNextPage) pagination.nextPage();
        }
      }

      function displayMarker(place) {
        if (window.places[place.id] == null) {
          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(place.y, place.x),
          });
          window.places[place.id] = place;
          clusterer.addMarker(marker);

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", () => {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
            infowindow.open(window.map, marker);
          });
        }
      }

      this.$store.commit("updateKakaoMap", window.map);

      
      // TODO : need fix : view 전화될때마다 updateSelectedEstate listener가 add 됨.
      this.$store.subscribe((mutation) => {
        if (mutation.type == "updateSelectedEstate") {
          console.log("updateSelectedEstate");
          const estate = this.$store.getters.getSelectedEstate;
          const position = new kakao.maps.LatLng(estate.y, estate.x);
          window.map.setLevel(3);
          window.map.setCenter(position);

          const marker = new kakao.maps.Marker({
            position: position,
            title: estate.place_name,
          });
          marker.setMap(window.map);
        }
      });
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
