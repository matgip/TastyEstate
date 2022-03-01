import store from "@/store";
/* global kakao */

class MapKakao {
  SCANNED = 1;
  MIN_CLSTR_MAP_LEVEL = 5;

  options;
  container;
  mapCtrl;
  zoomCtrl;
  placeSrch;
  markerClstr;
  infoWindow;

  constructor() {}

  loadMap() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      return;
    }
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(this.initMap);
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY;
    document.head.appendChild(script);
  }

  initMap() {
    this.options = {
      center: new kakao.maps.LatLng(37.2579324408187, 127.059981890576),
      level: this.MIN_CLSTR_MAP_LEVEL,
    };
    this.container = document.getElementById("mapview");
    window.map = new kakao.maps.Map(this.container, this.options);
    this.mapCtrl = new kakao.maps.MapTypeControl();
    this.zoomCtrl = new kakao.maps.ZoomControl();
    this.placeSrch = new kakao.maps.services.Places(window.map);
    this.markerClstr = new kakao.maps.MarkerClusterer({
      map: window.map,
      averageCenter: true,
      minLevel: this.MIN_CLSTR_MAP_LEVEL,
    });

    // display infos when marker clicked
    this.infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // terrian infos
    window.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    // switch between normal and skyview
    window.map.addControl(this.mapCtrl, kakao.maps.ControlPosition.TOPRIGHT);
    // zoom in and out
    window.map.addControl(this.zoomCtrl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(window.map, "dragend", this.scanMap.bind(this));
    kakao.maps.event.addListener(window.map, "zoom_changed", this.scanMap.bind(this));

    store.subscribe((mutation) => {
      if (mutation.type == "UPDATE_ESTATE") {
        const e = store.getters.GET_ESTATE;
        if (Object.keys(e).length === 0) return;

        const position = new kakao.maps.LatLng(e.y, e.x);
        window.map.setLevel(3);
        window.map.setCenter(position);

        const imgSrc = require("../../assets/images/marker_selected.png");
        const imgSize = new kakao.maps.Size(45, 55);
        const mi = new kakao.maps.MarkerImage(imgSrc, imgSize);
        const m = new kakao.maps.Marker({
          position: position,
          title: e.place_name,
          image: mi,
        });
        m.setMap(window.map);
      }
    });
  }

  scanMap() {
    const lvl = window.map.getLevel();
    if (lvl >= this.MIN_CLSTR_MAP_LEVEL) return;

    const latlng = window.map.getCenter();
    const lat = Math.round(latlng.getLat() * 100) / 100;
    const lng = Math.round(latlng.getLng() * 100) / 100;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        this.scan((lat + i / 100).toFixed(2), (lng + j / 100).toFixed(2));
      }
    }
  }

  scan(lat, lng) {
    if (this.isScanned(lat, lng)) return;
    this.setScanned(lat, lng);
    this.addCircle(lat, lng);
    this.placeSrch.categorySearch("AG2", this.callback.bind(this), { x: lng, y: lat, radius: 300 });
  }

  isScanned(lat, lng) {
    if (window.scannedLatlng === undefined) return false;
    if (window.scannedLatlng[lat] === undefined) return false;
    return window.scannedLatlng[lat][lng] === this.SCANNED;
  }

  setScanned(lat, lng) {
    window.scannedLatlng ??= new Array();
    window.scannedLatlng[lat] ??= new Array();
    window.scannedLatlng[lat][lng] = this.SCANNED;
  }

  addCircle(lat, lng) {
    const crcl = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(lat, lng),
      radius: 300,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      strokeOpacity: 0.1,
      strokeStyle: "dashed",
      fillColor: "#FFFFFF",
      fillOpacity: 0.5,
    });
    crcl.setMap(window.map);
  }

  callback(places, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      for (let p of places) {
        this.setPlace(p);
        this.addMarker(p);
      }
    }
    if (pagination.hasNextPage) pagination.nextPage();
  }

  setPlace(place) {
    window.places ??= new Array();
    window.places[place.id] ??= place;
  }

  addMarker(place) {
    const imgSrc = require("@/assets/images/marker.png");
    const imgSize = new kakao.maps.Size(35, 45);
    const mi = new kakao.maps.MarkerImage(imgSrc, imgSize);
    const m = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(place.y, place.x),
      image: mi,
    });
    this.markerClstr.addMarker(m);
    kakao.maps.event.addListener(m, "click", () => {
      this.infoWindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>");
      this.infoWindow.open(window.map, m);
    });
  }
}

export const $map = {
  kakao: new MapKakao(),
};
