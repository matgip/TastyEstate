<template>
  <div>
    <div>
      <Search @scroll-up="scrollUp" />
    </div>

    <div id="dashboard_container">
      <header>
        <v-btn id="dashboard_scroll_button" @click="scrollToggle" block>
          <v-icon v-if="!isScrollUp">fa-solid fa-arrow-up</v-icon>
          <v-icon v-else>fa-solid fa-arrow-down</v-icon>
        </v-btn>
      </header>

      <section>
        <div id="dashboard_no-result_container" v-if="!agency.id && agencies.length === 0">
          <NoContent />
        </div>

        <template>
          <Agency v-if="agency.id" :agency="agency" :key="agency.id" />
        </template>

        <v-divider />

        <div v-if="agencies.length !== 0">
          <div class="dashboard_agencies_title">
            <h3>검색 결과</h3>
          </div>
          <template v-for="agency in agencies">
            <Agency :agency="agency" :key="agency.id" />
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Search from "@/components/cards/SearchBar.vue";
import Agency from "@/components/cards/AgencyCard/AgencyCard.vue";
import NoContent from "@/components/cards/NoContentCard/NoContent.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Search,
    Agency,
    NoContent,
  },

  data() {
    return {
      isScrollUp: false,
    };
  },

  computed: {
    ...mapGetters({
      agency: "GET_ESTATE",
      agencies: "GET_ESTATES",
    }),
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
  },
};
</script>

<style scope>
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
  overflow-y: overlay;
}

.dashboard_agencies_title {
  margin: 14px 14px;
}

#dashboard_no-result_container {
  text-align: center;
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
</style>
