<template>
  <div>
    <!-- Search Text Field -->
    <v-text-field
      filled
      dense
      outlined
      style="padding:10px"
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

<style scoped>
</style>