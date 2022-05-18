<template>
  <div>
    <div id="dashboard_menu">
      <Menu @close-menu-card="handleCloseMenuEvent()" />
    </div>
    <div>
      <Search
        @agencies-updated="handleAgencyUpdatedEvent()"
        @open-menu="handleOpenMenuEvent()"
        @open-news="handleOpenNewsEvent()"
      />
    </div>

    <div id="dashboard_container">
      <section>
        <v-btn id="dashboard_scroll_button" @click="scrollToggle" block>
          <v-icon v-if="!isScrollUp">{{ fontAwesomeArrowUp }}</v-icon>
          <v-icon v-else>{{ fontAwesomeArrowDown }}</v-icon>
        </v-btn>

        <!-- 검색 결과 없음 -->
        <div v-if="!agency.id && agencies.length === 0">
          <NoContent />
        </div>

        <!-- News -->

        <!-- 리뷰 card -->
        <div id="dashboard_reviews">
          <div v-if="agency.id">
            <Reviews @close-reviews-card="handleCloseReviewsEvent()" />
          </div>
        </div>

        <!-- 선택된 부동산 -->
        <div id="dashboard_agency">
          <div v-if="agency.id">
            <Agency :agency="agency" :key="agency.id" @open-reviews-card="handleOpenReviewsEvent()" />
          </div>
        </div>

        <v-divider />

        <!-- 근처 부동산 -->
        <div id="dashboard_agencies">
          <div v-if="agencies.length !== 0">
            <div class="dashboard_agencies_title">
              <h3>근처 베스트 부동산</h3>
            </div>

            <template
              v-for="agency in agencies.slice((agencyPage - 1) * maxAgenciesPerPage, agencyPage * maxAgenciesPerPage)"
            >
              <Agency :agency="agency" :key="agency.id" @open-reviews-card="handleOpenReviewsEvent()" />
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
      maxAgenciesPerPage: 4,
      isScrollUp: false,

      vuetifyPagination: {
        color: "deep-orange",
        circle: true,
        class: "mt-10",
      },
      fontAwesomeArrowUp: "fa-solid fa-arrow-up",
      fontAwesomeArrowDown: "fa-solid fa-arrow-down",
    };
  },

  computed: {
    ...mapGetters({
      agency: "GET_ESTATE",
      agencies: "GET_ESTATES",
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
      val.stars = this.agency.stars;
      val.likes = this.agency.likes;
    },
  },

  methods: {
    // Scroll
    scrollToggle() {
      const item = document.getElementById("dashboard_container");
      item.classList.toggle("scrolled");

      if (item.classList.length === 0) this.isScrollUp = false;
      else this.isScrollUp = true;
    },

    scrollUp() {
      const item = document.getElementById("dashboard_container");
      if (item.classList.length !== 0) return;

      item.classList.toggle("scrolled");
      this.isScrollUp = true;
    },

    handleAgencyUpdatedEvent() {
      this.scrollUp();
      this.handleCloseReviewsEvent();
    },

    // Menu
    handleOpenMenuEvent() {
      this.$_openMenu();
    },
    handleCloseMenuEvent() {
      this.$_closeMenu();
    },

    // News
    handleOpenNewsEvent() {
      this.scrollUp();
    },

    // Reviews
    handleOpenReviewsEvent() {
      this.$_openReviews();
      this.$_closeAgencies();
    },
    handleCloseReviewsEvent() {
      this.$_closeReviews();
      this.$_openAgencies();
    },

    $_openMenu() {
      const item = document.getElementById("dashboard_menu");
      if (!item.classList.contains("open")) item.classList.add("open");
    },

    $_closeMenu() {
      const item = document.getElementById("dashboard_menu");
      if (item.classList.contains("open")) item.classList.remove("open");
    },

    $_openReviews() {
      const reviewsItem = document.getElementById("dashboard_reviews");
      if (!reviewsItem.classList.contains("open")) reviewsItem.classList.add("open");
    },

    $_closeReviews() {
      const reviewsItem = document.getElementById("dashboard_reviews");
      if (reviewsItem.classList.contains("open")) reviewsItem.classList.remove("open");
    },

    $_openAgencies() {
      const agencyItem = document.getElementById("dashboard_agency");
      const agenciesItem = document.getElementById("dashboard_agencies");

      if (agencyItem.classList.contains("close")) agencyItem.classList.remove("close");
      if (agenciesItem.classList.contains("close")) agenciesItem.classList.remove("close");
    },

    $_closeAgencies() {
      const agencyItem = document.getElementById("dashboard_agency");
      const agenciesItem = document.getElementById("dashboard_agencies");

      if (!agencyItem.classList.contains("close")) agencyItem.classList.add("close");
      if (!agenciesItem.classList.contains("close")) agenciesItem.classList.add("close");
    },
  },
};
</script>

<style scope>
#dashboard_menu {
  display: none;
}

#dashboard_menu.open {
  display: block;
}

#dashboard_reviews {
  display: none;
}

#dashboard_reviews.open {
  display: block;
}

#dashboard_agency.close {
  display: none;
}

#dashboard_agencies.close {
  display: none;
}

/* Searched agencies */
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
    /* overflow-y: auto; */

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
</style>
