<template>
  <div>
    <v-app>
      <Appbar />
      <v-main>
        <router-view :key="$route.fullPath"></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Appbar from "./components/TheAppbar.vue";
export default {
  name: "App",
  data: () => ({}),
  components: {
    Appbar,
  },
};
</script>

<style scoped></style>
