<template>
  <div data-app id="search">
    <v-autocomplete
      :style="searchCss"
      v-bind="searchProps"
      v-model="select"
      :items="estates"
      :loading="isLoading"
      :search-input.sync="search"
      @click:clear="clear"
    >
      <!-- Selected estate -->
      <template #selection="{ attr, on, item, selected }">
        <v-chip v-bind="[chipProps, attr]" :input-value="selected" v-on="on">
          <v-icon v-bind="iconProps">{{ iconSelected }}</v-icon>
          <span v-text="item.place_name" />
        </v-chip>
      </template>
      <!-- Searched estated -->
      <template #item="{ item }">
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
    estates: [],
    search: null,
    select: null,
    iconSelected: "fas fa-map-marked-alt",
    KAKAO_API: {
      url: "https://dapi.kakao.com/v2/local/search/keyword.json",
      groupCode: "AG2",
      radius: 20000,
    },

    // Vuetify CSS Style & Props
    searchCss: {
      width: "386px",
      margin: "0px 8px",
    },
    searchProps: {
      clearable: true,
      color: "deep-orange",
      label: "지역 또는 단지명을 입력하세요.",
      "no-filter": true,
      "return-object": true,
      "append-icon": "fas fa-search",
      "item-text": "place_name",
    },
    iconProps: {
      left: true,
      small: true,
    },
    chipProps: {
      small: true,
      class: "white--text",
      color: "deep-orange",
    },
  }),

  watch: {
    async select(estate) {
      if (!estate) return;
      try {
        await this.$store.dispatch("updateRealEstate", estate);
        await this.$store.dispatch("getLikes", estate.id);
        await this.$store.dispatch("getStars", estate.id);
      } catch (err) {
        console.error(err);
      }
    },

    search(keyword) {
      if (!keyword || keyword === this.select) return;
      this.searchEstate(keyword);
    },
  },

  methods: {
    searchEstate(keyword) {
      this.isLoading = true;
      fetch(
        `${this.KAKAO_API.url}?query=${keyword}&category_group_code=${this.KAKAO_API.groupCode}&radius=${this.KAKAO_API.radius}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
          },
        }
      )
        .then((res) => res.clone().json())
        .then((res) => (this.estates = res.documents))
        .catch((err) => console.log(err))
        .finally(() => (this.isLoading = false));
    },

    clear() {
      this.$store.commit("CLEAR_ESTATE");
      this.$store.commit("CLEAR_LIKES");
      this.$store.commit("CLEAR_STARS");
    },
  },
};
</script>

<style scoped>
#search {
  border-bottom: 1px solid #bdbdbd;
}
@media screen and (max-width: 768px) {
  #search {
    padding: 0 30px;
  }
}
</style>
