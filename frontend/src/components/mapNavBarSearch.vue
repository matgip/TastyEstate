<template>
  <div data-app>
    <v-autocomplete
      v-model="select"
      :loading="isLoading"
      :search-input.sync="search"
      :items="items"
      item-text="address_name"
      return-object
      no-filter
      clearable
      solo
      class="mx-4"
      label="지역 또는 단지명을 입력하세요."
    >
      <!-- Selected region -->
      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip
          v-bind="attr"
          :input-value="selected"
          color="blue-grey"
          class="white--text"
          v-on="on"
        >
          <v-icon left>
            fas fa-map-marked-alt
          </v-icon>
          <span v-text="item.address_name"></span>
        </v-chip>
      </template>
      <!-- Display search results -->
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-text="item.address_name"></v-list-item-title>
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
    select: null,
  }),
  watch: {
    search(keyWord) {
      if (!keyWord) return;
      if (keyWord === this.select) return;

      this.querySelection(keyWord);
    },
  },
  methods: {
    querySelection(keyWord) {
      this.isLoading = true;

      const headers = {
        Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
      };
      fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${keyWord}`,
        { headers }
      )
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res.documents;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
