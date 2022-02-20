<template>
  <div>
    <v-app>
      <Appbar />

      <v-main>
        <router-view :key="$route.fullPath"></router-view>
      </v-main>

      <Footer />
    </v-app>
  </div>
</template>

<script>
import Appbar from "./components/TheAppbar.vue";
import Footer from "./components/TheFooter.vue";
export default {
  name: "App",
  data: () => ({}),
  components: {
    Appbar,
    Footer,
  },
};
</script>

<style scoped></style>
