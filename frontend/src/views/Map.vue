<template>
  <div>
    <map-search />
    <map-kakao />
    <map-side-bar />
  </div>
</template>

<script>
import MapKakao from "@/components/Map/MapKakao.vue";
import MapSearch from "../components/Map/MapSearch.vue";
import MapSideBar from "../components/Map/MapSideBar.vue";

export default {
  components: {
    MapKakao,
    MapSearch,
    MapSideBar,
  },
};
</script>
