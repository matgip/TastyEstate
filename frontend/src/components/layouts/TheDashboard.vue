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
        <template>
          <Agency v-if="agency.id" :agency="agency" :key="agency.id" />
        </template>

        <v-divider />

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

import { mapGetters } from "vuex";

export default {
  components: {
    Masthead,
    Search,
    Agency,
  },

  data: () => ({}),

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
#dashboard__search-container {
  background-color: yellow;
}

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
