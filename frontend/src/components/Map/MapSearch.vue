<template>
  <div data-app>
    <v-autocomplete
      v-model="select"
      v-bind="autoCompleteProps"
      :items="estates"
      :loading="isLoading"
      :search-input.sync="search"
      label="지역 또는 단지명을 입력하세요."
      @click="clearRealEstate"
      @click:clear="clearRealEstate"
    >
      <template #selection="{ attr, on, item, selected }">
        <v-chip v-bind="[chipProps, attr]" :input-value="selected" v-on="on">
          <v-icon v-bind="iconProps">{{ selectedIcon }}</v-icon>
          <span v-text="item.place_name" />
        </v-chip>
      </template>

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
import api from "@/api/service.js";
import store from "@/store";

export default {
  data: () => ({
    isLoading: false,
    estates: [],
    search: null,

    select: null,
    selectedIcon: "fas fa-map-marked-alt",

    autoCompleteProps: {
      clearable: true,
      color: "deep-orange",
      class: "mx-4",
      dense: true,
      "no-filter": true,
      "solo-inverted": true,
      "return-object": true,
      "prepend-icon": "fas fa-search",
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

    kakaoAPI: {
      url: "https://dapi.kakao.com/v2/local/search/keyword.json",
      groupCode: "AG2",
      radius: 20000,
    },
  }),
  watch: {
    select(selected) {
      if (!selected) return;

      this.updateRealEstateDB(selected);
      this.setRealEstate(selected);
    },
    search(keyword) {
      if (!keyword) return;
      if (keyword === this.select) return;

      this.searchKakao(keyword);
    },
  },
  methods: {
    clearRealEstate() {
      store.commit("updateSelectedEstate", {});
    },
    setRealEstate(re) {
      store.commit("updateSelectedEstate", re);
    },
    async updateRealEstateDB(re) {
      try {
        const resp = await api.estates.getRealEstate(re);
        console.log(resp);
      } catch {
        const resp = await api.estates.setRealEstate(re);
        console.log(resp);
      }
    },
    searchKakao(keyword) {
      this.isLoading = true;
      const headers = {
        Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
      };

      fetch(
        `${this.kakaoAPI.url}?query=${keyword}&category_group_code=${this.kakaoAPI.groupCode}&radius=${this.kakaoAPI.radius}`,
        { headers }
      )
        .then((res) => res.clone().json())
        .then((res) => (this.estates = res.documents))
        .catch((err) => console.log(err))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
