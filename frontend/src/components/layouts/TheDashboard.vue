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
          <div class="dashboard__no-result__title">
            앗! 검색 결과가 없어요
          </div>
          <img class="dashboard__no-result__img" src="@/assets/images/no_search_result.png" width="120" height="120" />
          <div class="dashboard__no-result__tips">
            이건 어때요?
            <ul>
              <li>키워드를 정확하게 입력하셨는지 확인해보세요.</li>
              <li>키워드를 다르게 검색해보세요. (예 : 신원로 251-2 근처 부동산)</li>
            </ul>
          </div>
        </div>

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

/* No results */
#dashboard__no-result-container {
  text-align: center;
}

.dashboard__no-result__img {
  margin: 10px;
}

.dashboard__no-result__title {
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
}

.dashboard__no-result__tips {
  background-color: #e0e0e0;
  text-align: start;
  font-size: 14px;
  margin: 0 10px 10px 10px;
  padding: 10px 10px;
  border-radius: 4px;
}

.dashboard__no-result__tips ul {
  list-style-type: disc;
  margin-top: 10px;
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
