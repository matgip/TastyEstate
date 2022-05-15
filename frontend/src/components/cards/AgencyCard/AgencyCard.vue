<template>
  <div id="agency_card">
    <span>
      <!-- 부동산 이미지 -->
      <v-carousel v-bind="vuetifyCarousel" style="width: 140px; height: 168px;">
        <v-carousel-item v-for="i in images" :key="i" v-bind="vuetifyCarouselItem">
          <img :src="getImgUrl(agency.id, i)" style="width: 140px; height: 168px;" />
        </v-carousel-item>
      </v-carousel>
    </span>

    <span>
      <div class="agency_title_container">
        <h3>{{ agency.place_name }}</h3>
      </div>

      <div class="divider" />
      <!-- 부동산 평점 -->
      <div class="agency_rating_container">
        <p>
          <v-row v-bind="vuetifyRow">
            <v-rating v-bind="vuetifyStar" :value="agency.stars"></v-rating>
            <div v-bind="vuetifyStarText">{{ agency.stars }} ({{ agency.likes }} 좋아요)</div>
          </v-row>
        </p>
      </div>
      <!-- 부동산 정보(위치, 전화번호) -->
      <div class="agency_info_container">
        <p><v-icon v-bind="vuetifyIcon">fas fa-map-marker-alt</v-icon> {{ agency.address_name }}</p>
        <p><v-icon v-bind="vuetifyIcon">fas fa-book</v-icon> {{ agency.phone }}</p>
      </div>

      <div class="divider" />

      <!-- 부동산 리뷰 확인 버튼 -->
      <div class="agency_review_button_container">
        <p>
          <v-btn v-bind="vuetifyReviewButton" @click="launchReviewCard()">
            다른 사람들의 리뷰를 확인해보세요!
          </v-btn>
        </p>
      </div>
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
    vuetifyCarousel: {
      "hide-delimiters": true,
      "show-arrows-on-hover": true,
    },
    vuetifyCarouselItem: {
      transition: "fade-transition",
      "reverse-transition": "fade-transition",
    },
    vuetifyRow: {
      align: "center",
      class: "ma-0",
    },
    vuetifyStar: {
      size: 18,
      color: "amber",
      dense: true,
      readonly: true,
      "half-increments": true,
    },
    vuetifyStarText: {
      class: "grey--text ms-4",
    },
    vuetifyIcon: {
      "x-small": true,
    },
    vuetifyReviewButton: {
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

    launchReviewCard() {
      if (this.$_isloggedIn() === false) {
        alert("로그인 후, 사용 가능합니다.");
        this.$store.commit("UPDATE_LOGIN_VISIBLE_FLAG", true);
        return;
      }

      this.$store.commit("UPDATE_REVIEW_VISIBLE_FLAG", true);
    },

    $_isloggedIn() {
      return this.user != null;
    },
  },
};
</script>

<style>
#agency_card {
  display: flex;

  margin: 16px 15px;
}

.agency_title_container {
  margin: 4px 8px;
}

.agency_rating_container {
  margin: 4px 8px;

  font-size: 12px;
}

.agency_info_container {
  margin: 8px 8px;

  font-size: 12px;
}

.agency_review_button_container {
  margin: 4px 8px;

  font-size: 12px;
}

.divider {
  margin: 4px 4px;

  border-top: 1px solid #e0e0e0;
  border-radius: 0;
}

/* SASS */
.v-application p {
  margin-bottom: 0px;
}
</style>
