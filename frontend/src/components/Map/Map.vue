<!-- @format -->

<template>
  <div>
    <MapKakao />
    <v-navigation-drawer bottom absolute v-model="drawer">
      <RealEstate />
    </v-navigation-drawer>
  </div>
</template>

<script>
import RealEstate from "../RealEstate/RE.vue";
import MapKakao from "./MapKakao.vue";

export default {
  computed: {
    estate() {
      return this.$store.getters.GET_ESTATE;
    },
    drawer() {
      return Object.keys(this.estate).length !== 0;
    },
  },
  components: {
    RealEstate,
    MapKakao,
  },
};
</script>

<style scoped></style>
