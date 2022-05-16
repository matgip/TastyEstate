<template>
  <div>
    <v-app>
      <v-main>
        <Dashboard class="main_dashboard_container" />
        <router-view :key="$route.fullPath" class="main_router_container"></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Dashboard from "./components/layouts/TheDashboard.vue";
export default {
  name: "App",

  components: {
    Dashboard,
  },

  async mounted() {
    await this.$store.dispatch("fetchUser");
  },

  methods: {},
};
</script>

<style scope>
.main_dashboard_container {
  position: absolute;
  z-index: 20;
  overflow-y: hidden;
  width: var(--dashboard-width);
  height: 100%;
}
.main_router_container {
  margin-left: var(--dashboard-width);
  height: 100%;
}

@media screen and (max-width: 768px) {
  .main_dashboard_container {
    width: 100%;
    height: fit-content;
  }

  .main_router_container {
    margin-left: 0;
  }
}
</style>
