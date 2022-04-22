<template>
  <div>
    <v-app>
      <Masthead />

      <v-main>
        <Search v-if="isNotInLoginPage()" />
        <router-view :key="$route.fullPath"></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Masthead from "./components/layouts/TheMasthead.vue";
import Search from "./components/Map/MapSearch.vue";
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
    Masthead,
    Search,
  },
};
</script>
