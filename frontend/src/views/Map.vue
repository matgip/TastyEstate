<template>
  <div>
    <MapKakao />
    <SideBar />
  </div>
</template>

<script>
import SideBar from "@/components/Map/MapSideBar.vue";
import MapKakao from "@/components/Map/MapKakao.vue";

export default {
  components: {
    MapKakao,
    SideBar,
  },
};
</script>
