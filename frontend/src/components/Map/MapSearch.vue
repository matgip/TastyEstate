<template>
  <div data-app>
    <!-- Search Bar -->
    <v-autocomplete
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      :menu-props="{ maxHeight: 500 }"
      dense
      clearable
      no-filter
      solo-inverted
      return-object
      class="mx-4"
      color="deep-orange"
      v-model="select"
      item-text="place_name"
      prepend-icon="fas fa-search"
      label="지역 또는 단지명을 입력하세요."
    >
      <!-- Selected real estate -->
      <template v-slot:selection="{ attr, on, item, selected }">
        <!-- Selected real estate v-chip  -->
        <v-chip
          small
          :input-value="selected"
          v-on="on"
          v-bind="attr"
          color="deep-orange"
          class="white--text"
        >
          <v-icon left small>fas fa-map-marked-alt</v-icon>
          <span v-text="item.place_name" />
        </v-chip>
      </template>

      <!-- Real Estates near search keyword -->
      <template v-slot:item="{ item }">
        <!-- List of searched real estate results -->
        <v-list-item-content>
          <v-list-item-title v-text="item.place_name" />
          <v-list-item-subtitle v-text="item.address_name" />
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
    select(selected) {
      if (!selected) return;
      this.$store.commit("updateSelectedEstate", selected);
    },
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
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyWord}&category_group_code=AG2&radius=20000`,
        { headers }
      )
        .then((res) => res.clone().json())
        .then((res) => (this.items = res.documents))
        .catch((err) => console.log(err))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
