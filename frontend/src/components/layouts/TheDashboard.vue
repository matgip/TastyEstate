<template>
  <div>
    <div id="dashboard_menu">
      <Menu @close-menu-card="$eventHandler.handle('close-menu-card')" />
    </div>
    <div>
      <Search
        @agencies-updated="$eventHandler.handle('agencies-updated')"
        @open-menu-card="$eventHandler.handle('open-menu-card')"
        @open-news="$eventHandler.handle('open-news')"
      />
    </div>

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

        <!-- News -->

        <!-- 리뷰 card -->
        <div id="dashboard_reviews">
          <div v-if="agency.id">
            <Reviews @close-reviews-card="$eventHandler.handle('close-reviews-card')" />
          </div>
        </div>

        <!-- 선택된 부동산 -->
        <div id="dashboard_agency">
          <div v-if="agency.id">
            <Agency :agency="agency" :key="agency.id" @open-reviews-card="$eventHandler.handle('open-reviews-card')" />
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
              <Agency
                :agency="agency"
                :key="agency.id"
                @open-reviews-card="$eventHandler.handle('open-reviews-card')"
              />
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

  mounted() {
    this.$eventHandler.addHandler(
      "agencies-updated",
      this.scrollUp,
      this.$_closeReviews,
      this.$_openAgency,
      this.$_openAgencies
    );

    this.$eventHandler.addHandler("open-menu-card", this.$_openMenu);
    this.$eventHandler.addHandler("close-menu-card", this.$_closeMenu);

    this.$eventHandler.addHandler("open-news", this.scrollUp);

    this.$eventHandler.addHandler("open-reviews-card", this.$_openReviews, this.$_closeAgency, this.$_closeAgencies);
    this.$eventHandler.addHandler("close-reviews-card", this.$_closeReviews, this.$_openAgency, this.$_openAgencies);
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

    $_addClass(domId, className) {
      const elem = document.getElementById(domId);
      if (!elem.classList.contains(className)) elem.classList.add(className);
    },

    $_removeClass(domId, className) {
      const elem = document.getElementById(domId);
      if (elem.classList.contains(className)) elem.classList.remove(className);
    },

    $_openMenu() {
      this.$_addClass("dashboard_menu", "open");
    },

    $_openReviews() {
      this.$_addClass("dashboard_reviews", "open");
    },

    $_openAgency() {
      this.$_addClass("dashboard_agency", "open");
    },

    $_openAgencies() {
      this.$_addClass("dashboard_agencies", "open");
    },

    $_closeMenu() {
      this.$_removeClass("dashboard_menu", "open");
    },

    $_closeReviews() {
      this.$_removeClass("dashboard_reviews", "open");
    },

    $_closeAgency() {
      this.$_removeClass("dashboard_agency", "open");
    },

    $_closeAgencies() {
      this.$_removeClass("dashboard_agencies", "open");
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

#dashboard_agency {
  display: none;
}

#dashboard_agency.open {
  display: block;
}

#dashboard_agencies {
  display: none;
}

#dashboard_agencies.open {
  display: block;
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
