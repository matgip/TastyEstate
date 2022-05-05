<template>
  <div id="mapview">
    <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
    <div class="custom_zoomcontrol radius_border">
      <span @click="zoomIn"><i class="fa-solid fa-plus"></i></span>
      <span @click="zoomOut"><i class="fa-solid fa-minus"></i></span>
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
  data() {
    return {
      map: null,
    };
  },

  async mounted() {
    await this.initMap();

    this.$store.subscribe((mutation) => {
      if (mutation.type == "UPDATE_ESTATE") {
        const estate = this.estate;
        if (Object.keys(estate).length === 0) return;

        const marker = this.addMarker({ place: estate, isSelected: true });
        this.addClickHandler(marker, estate);
        this.moveTo(estate.y, estate.x);
        this.scanEstate();
      }
    });
  },

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
  },

  methods: {
    async initMap() {
      if (this.map) return;

      try {
        const map = new MapKakao();
        await map.mount("mapview", { imgMarker, imgSelected, imgSize });
        this.map = map;
      } catch (err) {
        console.error(err);
      }
    },

    addMarker(markerEntity) {
      return this.map.addMarker(markerEntity);
    },

    addClickHandler(marker, estate) {
      this.map.onMarkerClicked(marker, estate);
    },

    scanEstate() {
      this.map.scan();
    },

    moveTo(lat, lng) {
      this.map.moveTo(lat, lng);
    },

    zoomIn() {
      this.map.zoomIn();
    },

    zoomOut() {
      this.map.zoomOut();
    },
  },
};
</script>

<style scoped>
#mapview {
  width: 100%;
  height: 100%;
}

.custom_zoomcontrol {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 38px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #ff5722;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span i {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  color: white;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 2px solid white;
}

.radius_border {
  border: 2px solid white;
  border-radius: 5px;
  z-index: 2;
}

@media screen and (max-width: 768px) {
  .custom_zoomcontrol {
    top: 200px;
  }
}
</style>
