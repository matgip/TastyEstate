<template>
  <div data-app class="search-group">
    <div>
      <v-autocomplete
        v-bind="searchProps"
        v-model="select"
        :items="agencies"
        :loading="isLoading"
        :search-input.sync="search"
        @click:clear="clear"
      >
        <!-- agency selected -->
        <template #selection="{ attr, on, item, selected }">
          <v-chip v-bind="[chipSelectedProps, attr]" :input-value="selected" v-on="on">
            <v-icon v-bind="iconSelectedProps">{{ iconSelected }}</v-icon>
            <span v-text="item.place_name" />
          </v-chip>
        </template>

        <!-- agencies searched -->
        <template #item="{ item }">
          <v-list-item-content>
            <v-list-item-title v-text="item.place_name" />
            <v-list-item-subtitle v-text="item.address_name" />
          </v-list-item-content>
        </template>
      </v-autocomplete>

      <div class="filter">
        <div class="filter-layer">
          <div class="menu-container">
            <ul>
              <li @click="onSearchNear">근처 부동산</li>
              <li @click="onSortByRating">베스트 부동산</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters } from "vuex";

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
      clearable: true,
      color: "deep-orange",
      label: "지역 또는 단지명을 입력하세요.",
      "no-filter": true,
      "return-object": true,
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
    }),
  },

  watch: {
    async select(agency) {
      if (!agency) return;

      try {
        await this.$store.dispatch("updateAgency", agency);
        this.$store.commit("CLEAR_ESTATES");
      } catch (err) {
        console.error(err);
      }
    },

    async search(keyword) {
      if (!keyword || keyword === this.select) return;

      try {
        await this._searchEstate({ keyword, latLng: {} });
      } catch (err) {
        console.error(err);
      }
    },
  },

  methods: {
    async onSearchNear() {
      if (!this.agency) {
        // IMPORTANT: estate get flushed when SearchBar.vue file remounted
        // Must use this.estate by using mapgetter, not this.select.
        console.error("no selected agency...");
        return;
      }

      try {
        await this._searchEstate({ keyword: "", latLng: { y: this.agency.y, x: this.agency.x } });
        await this.$store.dispatch("updateAgencies", { agencies: this.agencies });
      } catch (err) {
        console.log(err);
      }
    },

    async onSortByRating() {
      if (!this.agency) {
        // IMPORTANT: estate get flushed when SearchBar.vue file remounted
        // Must use this.estate by using mapgetter, not this.select.
        console.error("no selected agency...");
        return;
      }

      try {
        await this._searchEstate({ keyword: "", latLng: { y: this.agency.y, x: this.agency.x } });
        await this.$store.dispatch("updateAgencies", { agencies: this.agencies, compareFn: this._comparator });
      } catch (err) {
        console.log(err);
      }
    },

    _comparator(a, b) {
      return a.stars < b.stars;
    },

    async _searchEstate(request) {
      if (!this._isValid(request)) {
        alert("먼저 부동산을 검색해주세요!");
        throw Error("Invalid input");
      }

      try {
        this.isLoading = true;
        await this._fetchAgencies(request);
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async _fetchAgencies(request) {
      const { keyword, latLng } = request;
      this.agencies = [];
      let page = 1;
      let isEnd = false;

      // Kakao map APIs provides up to 15 datas per request.
      // By increasing page count on every request of rest API,
      // get total datas(45) until is end.
      while (!isEnd) {
        const url = this._getUrl(keyword, page, latLng);
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

    _getUrl(keyword = "", pageCnt, latLng = {}) {
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

    _isValid(request) {
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
.v-text-field {
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 10px;
  margin-top: 0px;
  min-height: 4px;
}

.search-group {
  background-color: white;
  border-bottom: 1px solid #c0c0c0;
  padding-top: 10px;
}

.filter {
  position: relative;
  width: 368px;
  height: 43px;
}

.filter-layer {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  /* z-index: 20; */
  text-align: left;
  background-color: #fff;
}

.menu-container {
  overflow: hidden;
  white-space: nowrap;
}

.menu-container ul {
  padding: 0 8px;
}

.menu-container ul li {
  display: inline-block;
  padding: 4px 8px;
  margin: 0 4px;
  height: 100%;
  background-color: #ff5722;
  color: white;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid #ff5722;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  /* #search-group {
    padding: 0 30px;
  } */
}
</style>
