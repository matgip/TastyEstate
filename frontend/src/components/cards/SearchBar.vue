<!-- @format -->

<template>
  <div data-app class="search-group">
    <div>
      <v-autocomplete
        v-bind="searchProps"
        v-model="select"
        :items="estates"
        :loading="isLoading"
        :search-input.sync="search"
        @click:clear="clear"
      >
        <!-- estate selected -->
        <template #selection="{ attr, on, item, selected }">
          <v-chip v-bind="[chipSelectedProps, attr]" :input-value="selected" v-on="on">
            <v-icon v-bind="iconSelectedProps">{{ iconSelected }}</v-icon>
            <span v-text="item.place_name" />
          </v-chip>
        </template>

        <!-- estates searched -->
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
              <li class="scroll-li" @click="onNearByClicked">근처 부동산</li>
              <li class="scroll-li" @click="onBestClicked">베스트 부동산</li>
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
    estates: [],
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
      estate: "GET_ESTATE",
    }),
  },

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

    async search(keyword) {
      if (!keyword || keyword === this.select) return;
      const requestObj = { keyword: keyword, latLng: {} };
      await this._searchEstate(requestObj);
    },
  },

  methods: {
    async onNearByClicked() {
      if (!this.estate) {
        // !Important: estate get flushed when MapSearch.vue file remounted
        // Must use this.estate by using mapgetter, not this.select.
        console.error("no selected estate...");
        return;
      }
      const requestObj = { keyword: "", latLng: { y: this.estate.y, x: this.estate.x } };
      await this._searchEstate(requestObj);

      const searchGroup = document.querySelector(".search-group");
      searchGroup.classList.toggle("open");

      const filter = document.querySelector(".filter");
      filter.classList.toggle("close");
    },

    onBestClicked() {
      console.log("Best clicked");
    },

    async _searchEstate(requestObj) {
      try {
        const { keyword, latLng } = requestObj;
        if (keyword === "" && !latLng.y && !latLng.x) {
          console.log(`There is no any searched estates...
                      please search the estate first.`);
          return;
        }

        this.isLoading = true;
        this.estates = [];
        let page = 1;
        let isEnd = false;
        // Kakao map APIs provides up to 45 datas per request.
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
          this.estates = this.estates.concat(resp.data.documents);
          page += 1;
          isEnd = resp.data.meta.is_end;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
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

    clear() {
      this.$store.commit("CLEAR_ESTATE");
      this.$store.commit("CLEAR_LIKES");
      this.$store.commit("CLEAR_STARS");
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

/* #search-group {
  position: absolute;
  top: 12px;
  left: 11px;
  width: 368px;
  height: 100px;
  border-radius: 3px;
  border: 1px solid #cecece;
  border-bottom: 1px solid #c0c0c0;
  border-top: 1px solid #e9e9e9;
  background-color: #fff;
  z-index: 20;
} */
.search-group {
  background-color: white;
  border-bottom: 1px solid #c0c0c0;
  padding-top: 10px;
}

.search-group.open {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  background-color: #4d55b2;
  padding-top: 12px;
}

.filter {
  position: relative;
  width: 368px;
  height: 43px;
}

.filter.close {
  display: none;
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
  padding: 0 8px;
  margin: 0 4px;
  height: 100%;
  color: #ff5722;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ff5722;
}

.scroll-li {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  /* #search-group {
    padding: 0 30px;
  } */
}
</style>
