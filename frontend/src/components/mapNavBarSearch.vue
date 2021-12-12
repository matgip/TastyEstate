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
    search(keyWord) {
      console.log(keyWord);
      this.isLoading = true;
      // Lazily load input items
      const headers = {
        Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
      };
      fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${keyWord}`,
        { headers }
      )
        .then((res) => res.clone().json())
        .then((res) => {
          this.items.push(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
