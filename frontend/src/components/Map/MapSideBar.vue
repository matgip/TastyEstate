<template>
  <div id="sidebar">
    <nav :key="estate.id">
      <real-estate />
    </nav>
  </div>
</template>

<script>
import RealEstate from "@/components/RealEstate/RealEstate.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    RealEstate,
  },

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
  },
};
</script>

<style>
.v-application ul {
  padding-left: 0px;
}

#sidebar {
  position: absolute;
  background-color: white;
  width: 386px;
  z-index: 2;
  top: 67px;
}

#sidebar:hover {
  background-color: #cfd8dc;
}

@media screen and (max-width: 768px) {
  #sidebar {
    width: 100%;
    top: 422px;
  }

  #sidebar:hover {
    background-color: #cfd8dc;
  }
}
</style>
