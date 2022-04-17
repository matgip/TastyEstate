<template>
  <div>
    <v-app>
      <Navbar />

      <v-main>
        <Search v-if="isNotInLoginPage()" id="search" />
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

<style scoped>
#search {
  padding: 0 300px;
  margin-top: 10px;
  margin-bottom: 0px;
}

@media screen and (max-width: 768px) {
  #search {
    padding: 0 30px;
  }
}
</style>
