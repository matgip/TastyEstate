<template>
  <div>
    <v-app>
      <Navbar />

      <v-main>
        <Search v-if="isNotInLoginPage()" />
        <router-view :key="$route.fullPath"></router-view>
      </v-main>

      <Footer />
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/TheNavbar.vue";
import Search from "./components/Map/MapSearch.vue";
import Footer from "./components/TheFooter.vue";
export default {
  name: "App",
  async mounted() {
    await this.$store.dispatch("fetchUser");
  },
  methods: {
    isNotInLoginPage() {
      return this.$router.history.current["path"] !== "/login";
    },
  },
  components: {
    Navbar,
    Search,
    Footer,
  },
};
</script>
