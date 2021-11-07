<template>
  <div>
    <!-- Search Bar -->
    <v-text-field
      filled
      dense
      placeholder="Search"
      v-model="search"
      :append-icon="'mdi-magnify'"
      @click:append="getEstates"
    >
    </v-text-field>

    <!-- Navigation Drawer -->
    <v-navigation-drawer absolute permanent left height="100vh">
      <v-card>
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>차지연</v-list-item-title>
            <v-list-item-subtitle>8시간 전</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>매매 100억</v-list-item-title>
            <v-list-item-subtitle>대지 141평</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card >
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    search: "",
    show: false,
  }),
  methods: {
    getEstates() {
      console.log("Get Estate!");
    },
  },
};
</script>
