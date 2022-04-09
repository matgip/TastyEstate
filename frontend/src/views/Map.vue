<template>
  <div>
    <MapKakao />
    <v-navigation-drawer v-bind="navbarProps" :value="drawer">
      <RealEstate />
    </v-navigation-drawer>
  </div>
</template>

<script>
import RealEstate from "./RealEstate.vue";
import MapKakao from "@/components/Map/MapKakao.vue";

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
    MapKakao,
  },
  data() {
    return {
      navbarProps: {
        bottom: true,
        absolute: true,
        width: 400,
      },
    };
  },
};
</script>
