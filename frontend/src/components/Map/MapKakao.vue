<template>
  <div id="mapview">
    <div class="map_button_container">
      <!-- 지도 확대, 축소 컨트롤 div -->
      <div class="custom_zoomcontrol radius_border">
        <span @click="map.zoomIn()"><i class="fa-solid fa-plus"></i></span>
        <span @click="map.zoomOut()"><i class="fa-solid fa-minus"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import kakaoMap from "@/api/map/kakao";
import { mapGetters } from "vuex";

export default {
  mounted() {
    this.map = kakaoMap.mount();
    kakaoMap.setOnClickAgencyListener(this.onClickAgency);

    this.$store.commit("UPDATE_MAP", this.map);
  },

  data() {
    return {
      map: null,
    };
  },

  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
  },

  methods: {
    onClickAgency(place) {
      this.$store.dispatch("updateAgency", place);
      this.$store.commit("CLEAR_ESTATES");
    },
  },
};
</script>

<style scoped>
#mapview {
  width: 100%;
  height: 100%;
}

span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}

span i {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  color: #ff5722;
  border: none;
}

.map_button_container {
  position: absolute;
  right: 20px;
  width: 38px;
  height: 100%;
}

.custom_zoomcontrol {
  position: relative;
  top: 40px;
  height: 80px;
  z-index: 2;
  background-color: white;
}

.custom_zoomcontrol span:first-child {
  border-bottom: 2px solid #d8d8d8;
}

.radius_border {
  border: 2px solid #d8d8d8;
  border-radius: 10px;
  z-index: 2;
}

@media screen and (max-width: 768px) {
  .custom_zoomcontrol {
    top: 130px;
  }
}
</style>
