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
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
  }),
  methods: {
    getEstates() {
      console.log("Get Estate!");
    },
  },
};
</script>
