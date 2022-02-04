<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>Tasty estate</v-toolbar-title>

      <v-spacer />

      <v-btn depressed>
        로그인
        <v-icon right>fas fa-user-lock</v-icon>
      </v-btn>
      <v-btn depressed @click="gotoHome">
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
