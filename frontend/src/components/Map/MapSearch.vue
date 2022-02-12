<template>
  <div data-app>
    <v-autocomplete
      v-model="select"
      :search-input.sync="search"
      :items="items"
      :loading="isLoading"
      :menu-props="{ maxHeight: 500 }"
      no-filter
      clearable
      solo-inverted
      return-object
      dense
      label="지역 또는 단지명을 입력하세요."
      prepend-icon="fas fa-search"
      item-text="place_name"
      color="deep-orange"
      class="mx-4"
      @click="onClearEstate"
      @click:clear="onClearEstate"
    >
      <!-- Selected -->
      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip :input-value="selected" small class="white--text" color="deep-orange" v-on="on" v-bind="attr">
          <v-icon left small>fas fa-map-marked-alt</v-icon>
          <span v-text="item.place_name" />
        </v-chip>
      </template>

      <!-- Search Results -->
      <template v-slot:item="{ item }">
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
      this.vuexUpdateEstate(selected);
    },
    search(keyword) {
      if (!keyword) return;
      if (keyword === this.select) return;
      this.keywordSearch(keyword);
    },
  },
  methods: {
    onClearEstate() {
      this.vuexUpdateEstate({});
    },
    vuexUpdateEstate(estate) {
      this.$store.commit("updateSelectedEstate", estate);
    },
    keywordSearch(keyword) {
      this.isLoading = true;

      const headers = {
        Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
      };
      fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&category_group_code=AG2&radius=20000`,
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
