<!-- @format -->

<template>
  <div>
    <div id="dashboard__search-container">
      <Search />
    </div>
    <div id="dashboard__info-container">
      <header>
        <v-btn id="dashboard__scroll-btn" @click="scrollTest" block>
          Click to Scroll
        </v-btn>
      </header>
      <section>
        <template v-for="agency in items">
          <Agency :agency="agency" :key="agency.id" />
        </template>

        
        주변 부동산
      </section>
    </div>
  </div>
</template>

<script>
import Search from "@/components/cards/SearchBar.vue";
import Agency from "@/components/cards/AgencyCard/AgencyCard.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Search,
    Agency,
  },
  data: () => ({
    items: [],
  }),

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      stars: "GET_STARS",
      likes: "GET_LIKES",
    }),
  },
  watch: {
    estate: function(val) {
      if (Object.keys(this.estate).length !== 0) {
        val.type = "agency";
        val.stars = this.stars;
        val.likes = this.likes;
        this.items.push(val);
      }
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
  background-color: orange;
  height: 100%;
  overflow-y: hidden;
}

#dashboard__info-container section {
  background-color: orange;
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
