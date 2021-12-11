import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const INIT_MAP = (map) => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  };
  map = new kakao.maps.Map(container, options);

  // Display terrain information on the map
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

  // Switch map types between normal maps and skyview
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // Control the zoom in and out of the map
  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
};

const LOAD_KAKAO_MAP = (map) => {
  if (window.kakao && window.kakao.maps) {
    INIT_MAP(map);
  } else {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => {
      kakao.maps.load(INIT_MAP(map));
    };
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
      process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY;
    document.head.appendChild(script);
  }
};

export default new Vuex.Store({
  state: {
    map: null,
  },
  getters: {},
  mutations: {},
  actions: {
    loadKakaoMap() {
      LOAD_KAKAO_MAP(this.state.map);
    },
  },
});
