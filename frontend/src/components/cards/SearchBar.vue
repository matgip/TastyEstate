<!-- @format -->

<template>
  <div data-app class="search-group">
    <v-toolbar color="deep-orange">
      <v-autocomplete
        v-bind="searchProps"
        v-model="select"
        :items="agencies"
        :loading="isLoading"
        :search-input.sync="search"
        @click:clear="clear"
      >
        <!-- no selected -->
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              부동산을 검색해 보세요! (예:영통역 근처 부동산)
            </v-list-item-title>
          </v-list-item>
        </template>
        <!-- agency selected -->
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip v-bind="[chipSelectedProps, attr]" :input-value="selected" v-on="on">
            <v-icon v-bind="iconSelectedProps">{{ iconSelected }}</v-icon>
            <span v-text="item.place_name" />
          </v-chip>
        </template>
        <!-- agencies searched -->
        <template v-slot:item="{ item }">
          <v-list-item-content>
            <v-list-item-title v-text="item.place_name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.address_name"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>

      <template v-slot:extension>
        <v-tabs :hide-slider="!select" color="white" slider-color="white">
          <v-tab @click="onSortByRating">
            근처 부동산
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

import kakaoMap from "@/api/map/kakao2";

export default {
  data: () => ({
    isLoading: false,
    agencies: [],
    search: null,
    select: null,

    KAKAO_API: {
      keywordUrl: "https://dapi.kakao.com/v2/local/search/keyword.json",
      categoryUrl: "https://dapi.kakao.com/v2/local/search/category.json",
      groupCode: "AG2",
      radius: 300,
    },

    // Vuetify CSS Style & Props
    searchProps: {
      solo: true,
      chips: true,
      clearable: true,
      color: "deep-orange",
      label: "지역 또는 단지명을 입력하세요.",
      "no-filter": true,
      "return-object": true,
      "hide-details": true,
      "hide-selected": true,
      "append-icon": "fas fa-search",
      "item-text": "place_name",
    },

    iconSelectedProps: {
      left: true,
      small: true,
    },
    iconSelected: "fas fa-map-marked-alt",
    chipSelectedProps: {
      small: true,
      class: "white--text",
      color: "deep-orange",
    },
  }),

  computed: {
    ...mapGetters({
      agency: "GET_ESTATE",
      map: "GET_MAP",
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
        await this.$_searchEstate({ keyword, latLng: {} });
      } catch (err) {
        console.error(err);
      }
    },
  },

  methods: {
    async onSortByRating() {
      const query = this.$_createQuery();

      try {
        await this.$_searchEstate(query);
        await this.$store.dispatch("updateAgencies", { agencies: this.agencies, compareFn: this.$_comparator });
        this.$emit("scroll-wide");
      } catch (err) {
        console.error(err);
      }
    },

    $_comparator(a, b) {
      return a.stars < b.stars;
    },

    $_createQuery() {
      let queryObj;

      if (this.agency.id) {
        queryObj = { keyword: "", latLng: { y: this.agency.y, x: this.agency.x } };
      } else {
        const { y, x } = this.map.getCenter();
        queryObj = { keyword: "", latLng: { y, x } };
      }

      return queryObj;
    },

    async $_searchEstate(query) {
      if (!this.$_isValid(query)) {
        throw Error("Invalid input");
      }

      try {
        this.isLoading = true;
        await this._fetchAgencies(query);
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async _fetchAgencies(query) {
      const { keyword, latLng } = query;
      this.agencies = [];
      let page = 1;
      let isEnd = false;

      // Kakao map APIs provides up to 15 datas per request.
      // By increasing page count on every request of rest API,
      // get total datas(45) until is end.
      while (!isEnd) {
        const url = this.$_getUrl(keyword, page, latLng);
        const headers = {
          headers: {
            Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
          },
        };
        let resp = await axios.get(encodeURI(url), headers);
        this.agencies = this.agencies.concat(resp.data.documents);

        page += 1;
        isEnd = resp.data.meta.is_end;
      }
    },

    $_getUrl(keyword = "", pageCnt, latLng = {}) {
      let url = "";
      if (keyword !== "") {
        // keyword search
        url += `${this.KAKAO_API.keywordUrl}?query=${keyword}`;
      } else if (latLng.y && latLng.x) {
        // category search
        url += `${this.KAKAO_API.categoryUrl}?&y=${latLng.y}&x=${latLng.x}`;
      } else {
        console.error("Invalid url... try again");
        return "";
      }

      url += `&category_group_code=${this.KAKAO_API.groupCode}&radius=${this.KAKAO_API.radius}&page=${pageCnt}&size=15`;
      return url;
    },

    $_isValid(request) {
      const { keyword, latLng } = request;
      return keyword !== "" || (latLng.y && latLng.x);
    },

    clear() {
      this.$store.commit("CLEAR_ESTATE");
      this.$store.commit("CLEAR_ESTATES");
    },
  },
};
</script>

<style scoped>
.search-group {
  background-color: white;
  border-bottom: 1px solid #c0c0c0;
}
</style>
