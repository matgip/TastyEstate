<!-- @format -->

<template>
  <div>
    <div id="dashboard__search-container">
      <Search />
    </div>
    <div id="dashboard__info-container">
      <header>
        header item
        <v-btn id="dashboard__scroll-btn" @click="scrollTest" block>
          Click to Scroll
        </v-btn>
      </header>
      <section>
        <div class="info">info1</div>
        <div class="info">info2</div>
        <div class="info">info3</div>
        <div class="info">info4</div>
        <div class="info">info5</div>
        <div class="info">info6</div>
        <div class="info">info7</div>
        <div class="info">info8</div>
        <div class="info">info9</div>
        <div class="info">info10</div>
      </section>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Map/MapSearch.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Search,
  },
  data: () => ({
    items: [],
  }),

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
    }),
  },
  watch: {
    estate: function() {
      if (Object.keys(this.estate).length !== 0) {
        this.estate.type = "agency";
        this.items.unshift(this.estate);
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
