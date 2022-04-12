<template>
  <div id="mapview">
    <SideBar />
  </div>
</template>

<script>
import SideBar from "./MapSideBar.vue";

import { $map } from "@/api/map/kakao";

export default {
  mounted() {
    $map.kakao.loadMap();
  },
  components: {
    SideBar,
  },
};
</script>

<style scoped>
#mapview {
  width: 100%;
  height: calc(100vh - 64px);
}

@media screen and (max-width: 768px) {
  #mapview {
    height: 560px;
  }
}
</style>
