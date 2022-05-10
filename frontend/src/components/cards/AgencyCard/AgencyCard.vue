<template>
  <div id="agency__card">
    <span>
      <!-- Agency images -->
      <v-carousel v-bind="cruslProps" style="width: 140px; height: 168px;">
        <v-carousel-item v-for="i in images" :key="i" v-bind="carouselItemProps">
          <img :src="getImgUrl(agency.id, i)" style="width: 140px; height: 168px;" />
        </v-carousel-item>
      </v-carousel>
    </span>

    <span>
      <h3 class="agency__title">{{ agency.place_name }}</h3>

      <div class="divider" />
      <!-- Agency rating -->
      <p class="agency__stars">
        <v-row v-bind="starRowProps">
          <v-rating v-bind="starProps" :value="agency.stars"></v-rating>
          <div class="grey--text ms-4">{{ agency.stars }} ({{ agency.likes }} 좋아요)</div>
        </v-row>
      </p>
      <!-- Agency infos -->
      <p class="agency__info">
        <v-icon v-bind="infoIconProps">fas fa-map-marker-alt</v-icon> {{ agency.address_name }}
      </p>
      <p class="agency__info"><v-icon v-bind="infoIconProps">fas fa-book</v-icon> {{ agency.phone }}</p>

      <div class="divider" />
      <!-- Agency review button -->
      <p class="agency__review">
        <v-btn v-bind="reviewBtnProps" @click="gotoReviews">
          다른 사람들의 리뷰를 확인해보세요!
        </v-btn>
      </p>
    </span>
    <!-- <image-upload slot="agency-image-upload" :agencyId="agency.id" /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    agency: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    images: [1, 2, 3, 4, 5, 6],
    // Vuetify CSS Style & Props
    cruslProps: {
      "hide-delimiters": true,
      "show-arrows-on-hover": true,
    },
    carouselItemProps: {
      transition: "fade-transition",
      "reverse-transition": "fade-transition",
    },
    starRowProps: {
      align: "center",
      class: "ma-0",
    },
    starProps: {
      size: 18,
      color: "amber",
      dense: true,
      readonly: true,
      "half-increments": true,
    },
    infoIconProps: {
      "x-small": true,
    },
    reviewBtnProps: {
      color: "blue darken-4",
      class: "pa-0",
      text: true,
      small: true,
    },
  }),

  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
  },

  methods: {
    getImgUrl(agencyId, imgNum) {
      return `/api/upload/${agencyId}?image=${imgNum}`;
    },

    gotoReviews() {
      if (this.isloggedIn() === false) {
        alert("로그인 후, 사용 가능합니다.");
        this.gotoLogin();
        return;
      }
      this.$router.push({ path: "/reviews" });
    },

    gotoLogin() {
      this.$router.push({ path: "/login" });
    },

    isloggedIn() {
      return this.user != null;
    },
  },
};
</script>

<style>
#agency__card {
  display: flex;

  margin: 16px 15px;
}

.agency__title {
  margin: 4px 8px;
}

.agency__stars {
  margin: 4px 8px;

  font-size: 12px;
}

.agency__info {
  margin: 8px 8px;

  font-size: 12px;
}

.agency__review {
  margin: 4px 8px;

  font-size: 12px;
}

.divider {
  margin: 4px 4px;

  border-top: 1px solid #e0e0e0;
  border-radius: 0;
}

.v-application p {
  margin-bottom: 0px;
}
</style>
