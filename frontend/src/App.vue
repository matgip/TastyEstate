<template>
  <div>
    <!-- NavBar -->
    <v-app-bar app color="white">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Tasty Estate</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Goto Home -->
      <v-btn icon @click="gotoHome">
        Home
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    gotoHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
