<template>
  <div>
    <v-app-bar app color="white">
      <v-toolbar-title>Tasty estate</v-toolbar-title>

      <v-spacer />
      
      <v-btn class="ma-2" outlined small @click="gotoHome">
        HOME
        <v-icon right>fas fa-home</v-icon>
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
