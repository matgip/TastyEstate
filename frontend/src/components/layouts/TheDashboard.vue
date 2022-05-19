<template>
  <div>
    <section>
      <v-toolbar class="deep-orange">
        <!-- 서치바 -->
        <Search />

        <!-- Menu 버튼 -->
        <v-btn icon @click="onOpenMenu()">
          <v-icon>{{ fontAwesomeBar }}</v-icon>
        </v-btn>

        <!-- 하단 서치바 table -->
        <template v-slot:extension>
          <v-tabs color="white" slider-color="white">
            <v-tab @click="onSearchByCenter()">
              근처 부동산
            </v-tab>
            <v-tab>
              뉴스
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </section>

    <section v-if="menuVisibleFlag">
      <Menu @close-menu-card="onCloseMenu()" />
    </section>

    <div id="dashboard_container">
      <section>
        <v-btn id="dashboard_scroll_button" @click="scrollToggle" block>
          <v-icon v-if="!isScrollUp">{{ fontAwesomeArrowUp }}</v-icon>
          <v-icon v-else>{{ fontAwesomeArrowDown }}</v-icon>
        </v-btn>

        <!-- 검색 결과 없음 -->
        <div v-show="!agency.id && agencies.length === 0">
          <NoContent />
        </div>

        <!-- 리뷰 -->
        <div v-if="reviewVisibieFlag">
          <Reviews @close-reviews-card="onCloseReviews()" />
        </div>
        <!-- 부동산 -->
        <div v-else>
          <Agency v-if="agency.id" :agency="agency" :key="agency.id" @open-reviews-card="onOpenReviews()" />
          <div v-if="agencies.length !== 0">
            <v-divider />
            <h3 class="dashboard_agencies_title">근처 베스트 부동산</h3>
            <template
              v-for="agency in agencies.slice((agencyPage - 1) * maxAgenciesPerPage, agencyPage * maxAgenciesPerPage)"
            >
              <Agency :agency="agency" :key="agency.id" @open-reviews-card="onOpenReviews()" />
            </template>
            <v-pagination
              v-bind="vuetifyPagination"
              v-model="agencyPage"
              :length="agencyPageCount"
              :total-visible="5"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import mergesort from "mergesort";
import agencyApi from "@/api/agency";

import Search from "@/components/cards/SearchBar.vue";
import Menu from "@/components/cards/MenuCard/Menu.vue";
import Agency from "@/components/cards/AgencyCard/AgencyCard.vue";
import NoContent from "@/components/cards/NoContentCard/NoContent.vue";
import Reviews from "@/components/cards/ReviewsCard/Reviews.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Search,
    Menu,
    Agency,
    NoContent,
    Reviews,
  },

  data() {
    return {
      agencyPage: 1,
      agencies: [],
      maxAgenciesPerPage: 4,
      isScrollUp: false,
      menuVisibleFlag: false,
      reviewVisibieFlag: false,

      vuetifyPagination: {
        color: "deep-orange",
        circle: true,
        class: "mt-10",
      },
      fontAwesomeArrowUp: "fa-solid fa-arrow-up",
      fontAwesomeArrowDown: "fa-solid fa-arrow-down",
      fontAwesomeBar: "fas fa-bars",
    };
  },

  computed: {
    ...mapGetters({
      agency: "GET_AGENCY",
      map: "GET_MAP",
    }),

    agencyPageCount() {
      const agenciesPageCnt = this.agencies.length;
      if (agenciesPageCnt <= this.maxAgenciesPerPage) return 1;
      return Math.trunc(agenciesPageCnt / this.maxAgenciesPerPage + 1);
    },
  },

  watch: {
    agency: function(val) {
      if (Object.keys(this.agency).length === 0) return;
      val.type = "agency";
      // clear searched agencies
      this.agencies = [];
    },

    agencies: function() {
      if (this.agencies.length !== 0) this.scrollUp();
    },
  },

  methods: {
    $_comparator(a, b) {
      return a.stars < b.stars;
    },
    async onSearchByCenter() {
      try {
        const { y, x } = this.map.getCenter();
        const agencies = mergesort(this.$_comparator, await agencyApi.searchByCenter(x, y));
        this.agencies = agencies;
      } catch (err) {
        console.error(err);
      }
    },

    // Scroll
    scrollToggle() {
      const item = document.getElementById("dashboard_container");
      item.classList.toggle("scrolled");

      if (!item.classList.contains("scrolled")) this.isScrollUp = false;
      else this.isScrollUp = true;
    },

    scrollUp() {
      const item = document.getElementById("dashboard_container");
      if (!item.classList.contains("scrolled")) {
        item.classList.toggle("scrolled");
        this.isScrollUp = true;
      }
    },

    onOpenMenu() {
      this.menuVisibleFlag = true;
    },

    onCloseMenu() {
      this.menuVisibleFlag = false;
    },

    onOpenReviews() {
      this.reviewVisibieFlag = true;
    },

    onCloseReviews() {
      this.reviewVisibieFlag = false;
    },
  },
};
</script>

<style scope>
#dashboard_container {
  background-color: white;
  height: 100%;
  overflow-y: hidden;
}

#dashboard_container section {
  background-color: white;
  border: 10px solid #e0e0e0;
  height: 100%;
  overflow-y: auto;
}

.dashboard_agencies_title {
  margin: 14px 14px;
}

/* Scroll button */
#dashboard_scroll_button {
  display: none;
}

@media screen and (max-width: 768px) {
  #dashboard_container {
    position: fixed;

    width: 100%;
    height: 100%;
    top: calc(100vh - var(--agency-card-height));

    transform: translateY(0);
    transition: all 0.5s;
  }

  #dashboard_container.scrolled {
    top: 0%;
  }

  #dashboard_scroll_button {
    display: block;
  }
}

/* SASS - remove bottom  divider */
.theme--light.v-divider {
  border-color: rgba(0, 0, 0, 0);
}

.v-toolbar__content {
  display: flex;
  justify-content: space-between;
}
</style>
