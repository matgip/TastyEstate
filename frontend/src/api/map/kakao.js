import loadScriptOnce from "load-script-once";
import store from "@/store";

class MapKakao {
  SCANNED = 1;
  SCAN_MIN_LVL = 4;
  CLSTR_MIN_LVL = 3;

  constructor() {
    this.map = null;
    MapKakao.initialize();
  }

  async mount(mapId) {
    await MapKakao.initialize();
    // Re-use map
    if (MapKakao.cachedMaps[mapId]) {
      this.map = MapKakao.cachedMaps[mapId];
      const oElem = this.map.getNode();
      const nElem = document.getElementById(mapId);
      nElem.parentNode.replaceChild(oElem, nElem);
    } else {
      // Create map
      this.map = new MapKakao.daum.maps.Map(document.getElementById(mapId), {
        center: new MapKakao.daum.maps.LatLng(37.2579324408187, 127.059981890576),
        level: this.SCAN_MIN_LVL,
      });
      this.placeSrch = new MapKakao.daum.maps.services.Places(this.map);
      this.markerClstr = new MapKakao.daum.maps.MarkerClusterer({
        map: this.map,
        averageCenter: true,
        minLevel: this.CLSTR_MIN_LVL,
      });

      this.mapCtrl = new MapKakao.daum.maps.MapTypeControl();
      this.zoomCtrl = new MapKakao.daum.maps.ZoomControl();

      this.map.addControl(this.mapCtrl, MapKakao.daum.maps.ControlPosition.TOPRIGHT);
      this.map.addControl(this.zoomCtrl, MapKakao.daum.maps.ControlPosition.RIGHT);

      this.imgSelected = require("@/assets/images/marker_selected.png");
      this.imgMarker = require("@/assets/images/marker.png");
      this.imgSize = new MapKakao.daum.maps.Size(45, 45);

      this.iw = new MapKakao.daum.maps.InfoWindow({ zIndex: 1 });

      MapKakao.daum.maps.event.addListener(this.map, "dragend", this.scan.bind(this));
      MapKakao.daum.maps.event.addListener(this.map, "zoom_changed", this.scan.bind(this));

      store.subscribe((mutation) => {
        if (mutation.type == "UPDATE_ESTATE") {
          const e = store.getters.GET_ESTATE;
          if (Object.keys(e).length === 0) return;
          this.moveTo(e);
          this.addMarker({ place: e, image: this.imgSelected, isSelected: true });
        }
      });
      MapKakao.cachedMaps[mapId] = this.map;
    }
    return this;
  }

  moveTo(estate) {
    const currentLvl = this.map.getLevel();
    const latlng = new MapKakao.daum.maps.LatLng(estate.y, estate.x);
    if (currentLvl > this.CLSTR_MIN_LVL) this.map.setLevel(this.CLSTR_MIN_LVL);
    this.map.setCenter(latlng);
  }

  addMarker(markerInfo) {
    const { place, image, isSelected } = markerInfo;
    const m = new MapKakao.daum.maps.Marker({
      position: new MapKakao.daum.maps.LatLng(place.y, place.x),
      image: new MapKakao.daum.maps.MarkerImage(image, this.imgSize),
    });
    if (isSelected === true) {
      this.selectedMarker = m;
      this.showInfoWindowOnMap(m, place.place_name);
    }
    this.markerClstr.addMarker(m);
    MapKakao.daum.maps.event.addListener(m, "click", async () => {
      this.showInfoWindowOnMap(m, place.place_name);
      // Remove old selected estate
      this.rmSelectedMarker();
      // Update selected estate
      await store.dispatch("updateRealEstate", place);
      await store.dispatch("getLikes", place.id);
      await store.dispatch("getStars", place.id);
    });
  }

  showInfoWindowOnMap(marker, placeName) {
    this.iw.setContent('<div style="padding:5px;font-size:12px;">' + placeName + "</div>");
    this.iw.open(this.map, marker);
  }

  rmSelectedMarker() {
    this.markerClstr.removeMarker(this.selectedMarker);
  }
  // Divide the map into 9 equal squares and scan.
  scan() {
    const lvl = this.map.getLevel();
    if (lvl >= this.SCAN_MIN_LVL) return;

    const { lat, lng } = this.getRoundedLatLng();

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const x = (lng + j / 100).toFixed(2);
        const y = (lat + i / 100).toFixed(2);
        if (this.isScanned(y, x)) continue;
        this.cacheLatLng(y, x);
        this.placeSrch.categorySearch("AG2", this.callback.bind(this), { x: x, y: y, radius: 300 });
      }
    }
  }

  callback(places, status, pagination) {
    if (status === MapKakao.daum.maps.services.Status.OK) {
      for (let p of places) {
        this.cachePlace(p);
        this.addMarker({ place: p, image: this.imgMarker, isSelected: false });
      }
    }
    if (pagination.hasNextPage) pagination.nextPage();
  }

  getRoundedLatLng() {
    const latlng = this.map.getCenter();
    const lat = Math.round(latlng.getLat() * 100) / 100;
    const lng = Math.round(latlng.getLng() * 100) / 100;
    return { lat: lat, lng: lng };
  }

  isScanned(lat, lng) {
    if (window.cachedLatLng === undefined) return false;
    if (window.cachedLatLng[lat] === undefined) return false;
    return window.cachedLatLng[lat][lng] === this.SCANNED;
  }

  cacheLatLng(lat, lng) {
    window.cachedLatLng ??= new Array();
    window.cachedLatLng[lat] ??= new Array();
    window.cachedLatLng[lat][lng] = this.SCANNED;
  }

  cachePlace(place) {
    window.cachedPlaces ??= new Array();
    window.cachedPlaces[place.id] ??= place;
  }
}

MapKakao.cachedMaps = {};
MapKakao.daum = null;
MapKakao.initialize = function() {
  return new Promise((resolve, reject) => {
    loadScriptOnce(
      `${process.env.VUE_APP_MAP_LIB_URL}?autoload=false&appkey=${process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY}`,
      (err) => {
        if (err) return reject(err);
        MapKakao.daum = window.daum;
        MapKakao.daum.maps.load(() => resolve());
      }
    );
  });
};

export default MapKakao;
