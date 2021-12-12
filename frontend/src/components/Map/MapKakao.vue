<template>
  <div id="map"></div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("loadKakaoMap");
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
