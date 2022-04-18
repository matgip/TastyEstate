<template>
  <div id="sidebar">
    <nav :key="estate.id">
      <ul>
        <li><the-real-estate /></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import TheRealEstate from "@/components/RealEstate/TheRealEstate.vue";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
  },
  components: {
    TheRealEstate,
  },
};
</script>

<style>
#sidebar {
  position: absolute;
  background-color: white;
  width: 386px;
  z-index: 2;
  top: 67px;
}

.v-application ul {
  padding-left: 0px;
}
</style>
