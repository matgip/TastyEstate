<template>
  <div>
    <v-app>
      <v-main>
        <Dashboard class="main__dashboard-container" />
        <router-view :key="$route.fullPath" class="main__main-container"></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Dashboard from "./components/layouts/TheDashboard.vue";
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
    Dashboard,
  },
};
</script>

<style scope>
.main__dashboard-container {
  position: absolute;
  z-index: 20;
  overflow-y: hidden;
  width: var(--dashboard-width);
  height: 100%;
}
.main__main-container {
  margin-left: var(--dashboard-width);
  height: 100%;
}

@media screen and (max-width: 768px) {
  .main__dashboard-container {
    width: 100%;
    height: fit-content;
  }

  .main__main-container {
    margin-left: 0;
  }
}
</style>
