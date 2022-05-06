<template>
  <div>
    <div><Masthead /></div>

    <div id="dashboard__search-container">
      <Search />
    </div>
    <div id="dashboard__info-container">
      <header>
        <v-btn id="dashboard__scroll-btn" @click="scrollTest" block>
          <!-- Click to Scroll -->
          <v-icon>fa-solid fa-arrow-up</v-icon>
        </v-btn>
      </header>
      <section>
        <div v-if="!agency.id" id="dashboard__no-result-container">
          <NoContent />
        </div>
        <template>
          <Agency v-if="agency.id" :agency="agency" :key="agency.id" />
        </template>

        <v-divider />

        <h3 class="dashboard__agencies__title" v-if="agencies.length !== 0">검색 결과</h3>

        <template v-for="agency in agencies">
          <Agency :agency="agency" :key="agency.id" />
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import Masthead from "@/components/layouts/TheMasthead.vue";
import Search from "@/components/cards/SearchBar.vue";
import Agency from "@/components/cards/AgencyCard/AgencyCard.vue";
import NoContent from "@/components/cards/NoContentCard/NoContent.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Masthead,
    Search,
    Agency,
    NoContent,
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
    scrollTest() {
      const item = document.getElementById("dashboard__info-container");
      item.classList.toggle("scrolled");
    },
  },
};
</script>

<style scope>
.info {
  height: var(--agency-card-height);
  margin: 10px;
}

/* Search bar */
#dashboard__search-container {
  background-color: yellow;
}

/* Searched agencies */
#dashboard__info-container {
  background-color: white;
  height: 100%;
  overflow-y: hidden;
}

#dashboard__info-container section {
  background-color: white;
  border: 10px solid #e0e0e0;
  height: 100%;
  overflow-y: auto;
}

.dashboard__agencies__title {
  margin: 14px 14px;
}

#dashboard__no-result-container {
  text-align: center;
}

/* Scroll button */
#dashboard__scroll-btn {
  display: none;
}

@media screen and (max-width: 768px) {
  #dashboard__search-container {
    /* position: absolute; */
    /* width: 100%; */
    /* top: 0; */
  }

  #dashboard__info-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: calc(100vh - var(--agency-card-height));
    transform: translateY(0);
    transition: all 0.5s;
  }

  #dashboard__info-container.scrolled {
    top: 0%;
  }

  #dashboard__scroll-btn {
    display: block;
  }
}
</style>
