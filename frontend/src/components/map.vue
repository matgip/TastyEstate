<template>
  <div>
    <MapSearchBar/>
    <MapNavBar/>
  </div>
</template>

<script>
import MapNavBar from "./mapNavBar.vue";
import MapSearchBar from "./mapSearchBar.vue";

export default {
  components: {
    MapSearchBar,
    MapNavBar,
  },
};
</script>
