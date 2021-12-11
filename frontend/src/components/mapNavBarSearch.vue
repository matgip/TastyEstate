<template>
  <div data-app>
    <!-- Search Estate -->
    <v-autocomplete
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      label="지역 또는 단지명을 입력하세요."
      solo
    >
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    items: [],
    search: null,
  }),

  watch: {
    search(val) {
      console.log(val);
      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
