<template>
  <div id="mapview">
    <!-- 지도 확대, 축소 컨트롤 div 입니다 -->
    <div class="custom_zoomcontrol radius_border">
      <span @click="kakaoMap.zoomIn()"><i class="fa-solid fa-plus"></i></span>
      <span @click="kakaoMap.zoomOut()"><i class="fa-solid fa-minus"></i></span>
    </div>
  </div>
</template>

<script>
import kakaoMap from "@/api/map/kakao2";

export default {
  data() {
    return {
      map: null,
    };
  },

  mounted() {
    this.map = kakaoMap.mount();
    kakaoMap.setOnClickAgencyListener(this.onClickAgency);

    this.$store.commit("UPDATE_MAP", this.map);
  },

  methods: {
    onClickAgency(place) {
      console.log("on click");
      this.$store.dispatch("updateAgency", place);
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
