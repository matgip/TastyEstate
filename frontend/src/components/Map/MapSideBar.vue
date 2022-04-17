<template>
  <div id="styled__Sidebar">
    <nav :key="estate.id" :value="drawer">
      <ul>
        <li><RealEstate /></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import RealEstate from "@/components/RealEstate/RealEstate.vue";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
    drawer() {
      return Object.keys(this.estate).length !== 0;
    },
  },
  components: {
    RealEstate,
  },
};
</script>

<style>
#styled__Sidebar {
  position: absolute;
  background-color: white;
  width: 386px;
  z-index: 2;
  top: 72px;
}

.v-application ul {
  padding-left: 0px;
}
</style>
