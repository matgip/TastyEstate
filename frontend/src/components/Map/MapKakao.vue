<!-- @format -->

<template>
  <div id="map_container">
    <div id="mapview"></div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
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

      // 장소 검색 객체 생성
      // Reference : https://apis.map.kakao.com/web/sample/categoryFromBounds/
      const placeSearch = new kakao.maps.services.Places(window.map);

      const markerClusterer = new kakao.maps.MarkerClusterer({
        map: window.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 5, // 클러스터 할 최소 지도 레벨
      });

      // Information to display when marker is clicked
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      kakao.maps.event.addListener(window.map, "dragend", scan);
      kakao.maps.event.addListener(window.map, "zoom_changed", scan);

      function scan() {
        const level = window.map.getLevel();
        const latlng = window.map.getCenter();
        const lat = Math.round(latlng.getLat() * 100) / 100;
        const lng = Math.round(latlng.getLng() * 100) / 100;

        if (level < 7) {
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              searchAgency((lat + i / 100).toFixed(2), (lng + j / 100).toFixed(2));
            }
          }
        }
      }
      function searchAgency(lat, lng) {
        if (isAlreadyScanned(lat, lng) == false) {
          setScannedLatLng(lat, lng);
          displayCircle(lat, lng);
          placeSearch.categorySearch("AG2", placesSearchCallback, { x: lng, y: lat, radius: 710 });
        }

        function isAlreadyScanned(lat, lng) {
          if (window.scannedLatlng == null || window.scannedLatlng[lat] == null) return false;

          const SCANNED = 1;
          return window.scannedLatlng[lat][lng] == SCANNED;
        }
        function setScannedLatLng(lat, lng) {
          if (window.scannedLatlng == null) {
            window.scannedLatlng = new Array();
          }

          if (window.scannedLatlng[lat] == null) {
            window.scannedLatlng[lat] = new Array();
          }

          const SCANNED = 1;
          window.scannedLatlng[lat][lng] = SCANNED;
        }
        function displayCircle(lat, lng) {
          const circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(lat, lng), // 원의 중심좌표
            radius: 710, // 미터 단위의 원의 반지름
            strokeWeight: 1, // 선의 두께
            strokeColor: "#FFFFFF", // 선의 색깔
            strokeOpacity: 0.1, // 선의 불투명도 1에서 0 사이의 값이며 0에 가까울수록 투명
            strokeStyle: "dashed", // 선의 스타일
            fillColor: "#FFFFFF", // 채우기 색깔
            fillOpacity: 0.5, // 채우기 불투명도
          });
          circle.setMap(window.map);
        }
      }

      function placesSearchCallback(places, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          places.forEach((place) => {
            setScannedPlace(place);
            displayMarker(place);
          });

          if (pagination.hasNextPage) pagination.nextPage();
        }

        function setScannedPlace(place) {
          if (window.places == null) {
            window.places = new Array();
          }
          if (window.places[place.id] == null) {
            window.places[place.id] = place;
          }
        }
        function displayMarker(place) {
          const imgSrc = require("../../assets/images/marker.png");
          const imgSize = new kakao.maps.Size(35, 45);
          const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(place.y, place.x),
            image: markerImg,
          });
          markerClusterer.addMarker(marker);
          kakao.maps.event.addListener(marker, "click", () => {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
            infowindow.open(window.map, marker);
          });
        }
      }

      this.$store.subscribe((mutation) => {
        if (mutation.type == "updateSelected") {
          const estate = this.$store.getters.GET_ESTATE;
          if (isEmpty(estate)) return;

          const position = new kakao.maps.LatLng(estate.y, estate.x);
          window.map.setLevel(3);
          window.map.setCenter(position);

          const imgSrc = require("../../assets/images/marker_selected.png");
          const imgSize = new kakao.maps.Size(45, 55);
          const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);

          const marker = new kakao.maps.Marker({
            position: position,
            title: estate.place_name,
            image: markerImg,
          });
          marker.setMap(window.map);
        }

        function isEmpty(obj) {
          return Object.keys(obj).length === 0;
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
