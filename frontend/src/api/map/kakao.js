import store from "@/store";
/* global kakao */
class MapKakao {
  SCANNED = 1;
  MIN_MAP_LEVEL = 5;

  // defaults
  options;
  container;
  // map control
  mapCtrl;
  zoomCtrl;
  placeSrch;
  markerClstr;
  infoWindow;
  // marker img
  imgPlaceSelected;
  imgPlace;
  imgSize;

  constructor(lat, lng) {
    this.options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: this.MIN_MAP_LEVEL,
    };
    this.mapCtrl = new kakao.maps.MapTypeControl();
    this.zoomCtrl = new kakao.maps.ZoomControl();

    // display infos when marker clicked
    this.infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    this.imgPlaceSelected = require("@/assets/images/marker_selected.png");
    this.imgPlace = require("@/assets/images/marker.png");
    this.imgSize = new kakao.maps.Size(35, 45);
  }

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
    // Must guarantee to call initMap() after MapKakao.vue mounted
    this.container = document.getElementById("mapview");
    window.map = new kakao.maps.Map(this.container, this.options);
    this.placeSrch = new kakao.maps.services.Places(window.map);
    this.markerClstr = new kakao.maps.MarkerClusterer({
      map: window.map,
      averageCenter: true,
      minLevel: this.MIN_MAP_LEVEL,
    });

    // terrian infos
    window.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);
    // switch between normal and skyview
    window.map.addControl(this.mapCtrl, kakao.maps.ControlPosition.TOPRIGHT);
    // zoom in and out
    window.map.addControl(this.zoomCtrl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(window.map, "dragend", this.scan.bind(this));
    kakao.maps.event.addListener(window.map, "zoom_changed", this.scan.bind(this));

    store.subscribe((mutation) => {
      if (mutation.type == "UPDATE_ESTATE") {
        const e = store.getters.GET_ESTATE;
        if (Object.keys(e).length === 0) return;
        this.moveTo(e);
        this.addMarker(e, this.imgPlaceSelected);
      }
    });
  }

  moveTo(estate) {
    const p = new kakao.maps.LatLng(estate.y, estate.x);
    window.map.setLevel(3);
    window.map.setCenter(p);
  }

  scan() {
    const lvl = window.map.getLevel();
    if (lvl >= this.MIN_MAP_LEVEL) return;

    const { lat, lng } = this.getRoundedLatLng();

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const x = (lng + j / 100).toFixed(2);
        const y = (lat + i / 100).toFixed(2);
        if (this.isScanned(y, x)) continue;
        this.setScanned(y, x);
        this.placeSrch.categorySearch("AG2", this.callback.bind(this), { x: x, y: y, radius: 300 });
        this.addCircle(y, x);
      }
    }
  }

  callback(places, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      for (let p of places) {
        this.setPlace(p);
        this.addMarker(p, this.imgPlace);
      }
    }
    if (pagination.hasNextPage) pagination.nextPage();
  }

  addCircle(lat, lng) {
    const cl = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(lat, lng),
      radius: 300,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      strokeOpacity: 0.1,
      strokeStyle: "dashed",
      fillColor: "#757575",
      fillOpacity: 0.5,
    });
    cl.setMap(window.map);
  }

  addMarker(place, img) {
    const mi = new kakao.maps.MarkerImage(img, this.imgSize);
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

  getRoundedLatLng() {
    const latlng = window.map.getCenter();
    const lat = Math.round(latlng.getLat() * 100) / 100;
    const lng = Math.round(latlng.getLng() * 100) / 100;
    return { lat: lat, lng: lng };
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

  setPlace(place) {
    window.places ??= new Array();
    window.places[place.id] ??= place;
  }
}

export const $map = {
  kakao: new MapKakao(37.2579324408187, 127.059981890576),
};
