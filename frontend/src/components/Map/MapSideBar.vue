<template>
  <div>
    <v-navigation-drawer class="vuetify-sidebar" :style="top" :key="estate.id" v-bind="navbarProps" :value="drawer">
      <RealEstate />
    </v-navigation-drawer>
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
    top() {
      if (screen.width > 768) return "top: 72px";
      else return "top: 300px";
    },
  },
  data() {
    return {
      // Vuetify CSS style props
      navbarProps: {
        bottom: true,
        width: 360,
      },
    };
  },
  components: {
    RealEstate,
  },
};
</script>

<style scoped>
.vuetify-sidebar {
  position: absolute;
  z-index: 2;
}
</style>
