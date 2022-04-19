<template>
  <div id="mapview">
    <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
    <div class="custom_zoomcontrol radius_border">
      <span @click="zoomIn"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"/></span>
      <span @click="zoomOut"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"/></span>
    </div>
  </div>
</template>

<script>
import MapKakao from "@/api/map/kakao";

import { mapGetters } from "vuex";

const imgSelected = require("@/assets/images/marker_selected.png");
const imgMarker = require("@/assets/images/marker.png");
const imgSize = { width: 40, height: 45 };

export default {
  async mounted() {
    await this.initMap();

    this.$store.subscribe((mutation) => {
      if (mutation.type == "UPDATE_ESTATE") {
        const estate = this.estate;
        if (Object.keys(estate).length === 0) return;

        const marker = this.addMarker({ place: estate, image: imgSelected, isSelected: true });
        this.addClickHandler(marker, estate);
        this.moveTo(estate);
        this.scanEstate();
      }
    });
  },

  methods: {
    async initMap() {
      if (this.map) return;

      try {
        const map = new MapKakao();
        await map.mount("mapview");
        this.map = map;
        this.map.setMarker(imgMarker, imgSize);
      } catch (err) {
        console.error(err);
      }
    },

    addMarker(markerEntity) {
      return this.map.addMarker(markerEntity);
    },

    addClickHandler(marker, estate) {
      this.map.onEstateClicked(marker, estate);
    },

    scanEstate() {
      this.map.scan();
    },

    moveTo(estate) {
      this.map.moveTo(estate);
    },

    zoomIn() {
      this.map.zoomIn();
    },

    zoomOut() {
      this.map.zoomOut();
    },
  },

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
  },

  data() {
    return {
      map: null,
    };
  },
};
</script>

<style scoped>
#mapview {
  width: 100%;
  height: calc(100vh - 142px);
}

.custom_zoomcontrol {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #f5f5f5;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}

.radius_border {
  border: 1px solid #919191;
  border-radius: 5px;
  z-index: 2;
}

@media screen and (max-width: 768px) {
  #mapview {
    height: 400px;
  }
}
</style>
