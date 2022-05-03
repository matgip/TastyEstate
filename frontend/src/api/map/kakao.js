import loadScriptOnce from "load-script-once";
import store from "@/store";

class MapKakao {
  SCANNED = 1;
  SCAN_MIN_LVL = 4;
  CLSTR_MIN_LVL = 3;

  constructor() {
    this.map = null;
    this.placeSrch = null;
    this.markerClstr = null;
    this.iw = null;
    this.imgSelected = null;
    this.imgMarker = null;
    this.imgMarkerSize = null;
    MapKakao.initialize();
  }

  async mount(mapId, imgEntity) {
    await MapKakao.initialize();

    // Re-use map
    if (MapKakao.cachedMaps[mapId]) {
      const { map, ps, mc, iw, isz, im, is } = MapKakao.cachedMaps[mapId];
      // this.map = MapKakao.cachedMaps[mapId];
      this.map = map;
      this.placeSrch = ps;
      this.markerClstr = mc;
      this.iw = iw;
      this.imgMarkerSize = isz;
      this.imgMarker = im;
      this.imgSelected = is;

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
      const { imgMarker, imgSelected, imgSize } = imgEntity;
      const { width, height } = imgSize;
      this.imgMarkerSize = new MapKakao.daum.maps.Size(width, height);
      this.imgMarker = new MapKakao.daum.maps.MarkerImage(imgMarker, this.imgMarkerSize);
      this.imgSelected = new MapKakao.daum.maps.MarkerImage(imgSelected, this.imgMarkerSize);

      this.iw = new MapKakao.daum.maps.InfoWindow({ zIndex: 1 });

      MapKakao.daum.maps.event.addListener(this.map, "dragend", this.scan.bind(this));
      MapKakao.daum.maps.event.addListener(this.map, "zoom_changed", this.scan.bind(this));

      MapKakao.cachedMaps[mapId] = {
        map: this.map,
        ps: this.placeSrch,
        mc: this.markerClstr,
        iw: this.iw,
        isz: this.imgMarkerSize,
        im: this.imgMarker,
        is: this.imgSelected,
      };
    }
    return this;
  }

  addMarker(markerEntity) {
    const { place, isSelected } = markerEntity;
    let marker = this._getCachedMarker(place);
    if (!marker) {
      marker = new MapKakao.daum.maps.Marker({
        position: new MapKakao.daum.maps.LatLng(place.y, place.x),
      });
      this.markerClstr.addMarker(marker);
    }
    if (isSelected === true) {
      marker.setImage(this.imgSelected);
      this.selectedMarker = marker;
      this._showInfoWindowOnMap(marker, place.place_name);
    } else {
      marker.setImage(this.imgMarker);
    }
    return marker;
  }

  onMarkerClicked(marker, estate) {
    if (this._getCachedMarker(estate)) {
      // Bug fix: Do not add on-click listener if already added
      return;
    }
    MapKakao.daum.maps.event.addListener(marker, "click", async () => {
      // Update selected estate
      await store.dispatch("updateEstate", estate);
      this._showInfoWindowOnMap(marker, estate.place_name);
    });
    this._cacheMarker(estate, marker);
  }

  // Divide the map into 9 equal squares and scan.
  scan() {
    const lvl = this.map.getLevel();
    if (lvl >= this.SCAN_MIN_LVL) return;

    const { lat, lng } = this._getRoundedLatLng();

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const x = (lng + j / 100).toFixed(2);
        const y = (lat + i / 100).toFixed(2);
        if (this._isScanned(y, x)) continue;
        this._cacheLatLng(y, x);
        this.placeSrch.categorySearch("AG2", this._callback.bind(this), { x: x, y: y, radius: 300 }); // redius 710 will cover all boundary
      }
    }
  }

  moveTo(lat, lng) {
    const currentLvl = this.map.getLevel();
    const latlng = new MapKakao.daum.maps.LatLng(lat, lng);
    if (currentLvl > this.CLSTR_MIN_LVL) this.map.setLevel(this.CLSTR_MIN_LVL);
    this.map.setCenter(latlng);
  }

  zoomIn() {
    this.map.setLevel(this.map.getLevel() - 1);
  }

  zoomOut() {
    this.map.setLevel(this.map.getLevel() + 1);
  }

  _showInfoWindowOnMap(marker, placeName) {
    this.iw.setContent('<div style="padding:5px;font-size:12px;">' + placeName + "</div>");
    this.iw.open(this.map, marker);
  }

  _callback(places, status, pagination) {
    if (status === MapKakao.daum.maps.services.Status.OK) {
      for (let p of places) {
        const m = this.addMarker({ place: p, image: this.imgMarker, isSelected: false });
        this.onMarkerClicked(m, p);
      }
    }
    if (pagination.hasNextPage) pagination.nextPage();
  }

  _getRoundedLatLng() {
    const latlng = this.map.getCenter();
    const lat = Math.round(latlng.getLat() * 100) / 100;
    const lng = Math.round(latlng.getLng() * 100) / 100;
    return { lat: lat, lng: lng };
  }

  _isScanned(lat, lng) {
    if (MapKakao.cachedLatLng === undefined) return false;
    if (MapKakao.cachedLatLng[lat] === undefined) return false;
    return MapKakao.cachedLatLng[lat][lng] === this.SCANNED;
  }

  _cacheLatLng(lat, lng) {
    MapKakao.cachedLatLng ??= new Array();
    MapKakao.cachedLatLng[lat] ??= new Array();
    MapKakao.cachedLatLng[lat][lng] = this.SCANNED;
  }

  _cacheMarker(place, marker) {
    MapKakao.cachedPlaces ??= new Map();
    MapKakao.cachedPlaces.set(place.id, marker);
  }

  _getCachedMarker(place) {
    if (!MapKakao.cachedPlaces) return undefined;
    return MapKakao.cachedPlaces.get(place.id);
  }
}

MapKakao.cachedMaps = {};
MapKakao.daum = null;
MapKakao.cachedLatLng = null;
MapKakao.cachedPlaces = null;
MapKakao.initialize = function() {
  return new Promise((resolve, reject) => {
    loadScriptOnce(
      `${process.env.VUE_APP_MAP_LIB_URL}?autoload=false&appkey=${process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY}`,
      (err) => {
        if (err) return reject(err);
        MapKakao.daum = window.daum;
        MapKakao.cachedLatLng = window.cachedLatLng;
        MapKakao.cachedPlaces = window.cachedPlaces;
        MapKakao.daum.maps.load(() => resolve());
      }
    );
  });
};

export default MapKakao;
