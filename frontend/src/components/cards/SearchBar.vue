<template>
  <v-autocomplete
    v-bind="vuetifySearch"
    v-model="select"
    :items="agencies"
    :loading="isLoading"
    :search-input.sync="search"
    @click:clear="clear"
  >
    <!-- 검색 결과 없음 -->
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          부동산을 검색해 보세요! (예:영통역 근처 부동산)
        </v-list-item-title>
      </v-list-item>
    </template>

    <!-- 선택된 부동산 -->
    <template v-slot:selection="{ attr, on, item, selected }">
      <v-chip v-bind="[vuetifyChipSelected, attr]" :input-value="selected" v-on="on">
        <v-icon v-bind="vuetifyIconSelected">{{ fontAwesomeMap }}</v-icon>
        <span v-text="item.place_name" />
      </v-chip>
    </template>

    <!-- 부동산 검색 결과 -->
    <template v-slot:item="{ item }">
      <v-list-item-content>
        <v-list-item-title v-text="item.place_name"></v-list-item-title>
        <v-list-item-subtitle v-text="item.address_name"></v-list-item-subtitle>
        <v-row v-bind="vuetifyRow">
          <v-rating v-bind="vuetifyStar" :value="item.stars"></v-rating>
          <div v-bind="vuetifyStarText">({{ item.stars }})</div>
        </v-row>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters } from "vuex";

import kakaoMap from "@/api/map/kakao";
import agencyApi from "@/api/agency";

export default {
  data: () => ({
    isLoading: false,
    agencies: [],
    search: null,
    select: null,

    vuetifySearch: {
      solo: true,
      chips: true,
      clearable: true,
      color: "deep-orange",
      label: "지역 또는 단지명을 입력하세요.",
      "no-filter": true,
      "return-object": true,
      "hide-details": true,
      "hide-selected": true,
      "prepend-icon": "fas fa-building",
      "append-icon": "fas fa-search",
      "item-text": "place_name",
    },
    vuetifyIconSelected: {
      left: true,
      small: true,
    },
    vuetifyChipSelected: {
      small: true,
      class: "white--text",
      color: "deep-orange",
    },
    vuetifyRow: {
      align: "center",
      class: "ma-0",
    },
    vuetifyStar: {
      size: 18,
      color: "amber",
      dense: true,
      readonly: true,
      "half-increments": true,
    },
    vuetifyStarText: {
      class: "grey--text pt-1",
    },
    fontAwesomeMap: "fas fa-map-marked-alt",
  }),

  computed: {
    ...mapGetters({
      agency: "GET_AGENCY",
    }),
  },

  watch: {
    async select(estate) {
      if (!estate) return;
      kakaoMap.PinPlace(estate);
    },

    async search(keyword) {
      if (!keyword || keyword === this.select) return;

      try {
        const agencies = await agencyApi.searchByKeyword(keyword);
        this.agencies = agencies;
        console.log(this.agencies);
      } catch (err) {
        console.error(err);
      }
    },
  },

  methods: {
    clear() {
      this.$store.commit("CLEAR_ESTATE");
    },
  },
};
</script>
