<template>
  <div>
    <map-kakao />
    <map-side-bar />
  </div>
</template>

<script>
import MapKakao from "@/components/Map/MapKakao.vue";
import MapSideBar from "../components/Map/MapSideBar.vue";

export default {
  components: {
    MapKakao,
    MapSideBar,
  },
};
</script>
