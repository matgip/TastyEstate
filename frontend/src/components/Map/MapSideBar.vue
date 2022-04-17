<template>
  <div id="sidebar">
    <nav :key="estate.id">
      <ul>
        <li><RealEstate /></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import RealEstate from "@/components/RealEstate/TheRealEstate.vue";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
  },
  components: {
    RealEstate,
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
