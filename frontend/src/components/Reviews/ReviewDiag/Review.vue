<template>
  <div>
    <v-dialog v-model="dialog" v-bind="dialogProps">
      <template #activator="{ on }">
        <v-btn :style="btnStyl" v-bind="btnProps" v-on="on" @click="onClicked">
          <v-icon v-bind="iconProps">
            {{ icon }}
          </v-icon>
          리뷰 작성
        </v-btn>
      </template>

      <!-- Only can see if dialog is true -->

      <v-card>
        <v-card-title>
          <div>🏠 {{ estate.place_name }}</div>
        </v-card-title>

        <v-divider />

        <!-- Rating -->
        <div>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>🌟 평점을 남겨주세요</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-rating v-bind="starProps" v-model="rating"></v-rating>
            <span v-bind="textProp"> ({{ rating }}) </span>
          </v-list-item>
        </div>

        <v-divider />

        <kindness-chk-box :prop-kindness="kindness" />

        <v-divider />

        <price-chk-box :prop-price="price" />

        <v-divider />

        <contract-chk-box :prop-contract="contract" />

        <v-divider />

        <text-area
          :prop-title="title"
          :prop-text="text"
          @review-title="handleEventTitle"
          @review-text="handleEventText"
        />

        <v-card-actions>
          <v-spacer />
          <submit-btns slot="review-buttons" @submit-review="handleEventSubmit" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import KindnessChkBox from "./components/KindnessChkBox.vue";
import PriceChkBox from "./components/PriceChkBox.vue";
import ContractChkBox from "./components/ContractChkBox.vue";
import TextArea from "./components/TextArea.vue";
import SubmitBtns from "./components/SubmitBtns.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    KindnessChkBox,
    PriceChkBox,
    ContractChkBox,
    TextArea,
    SubmitBtns,
  },

  data: () => ({
    rating: 0.0,
    title: "",
    text: "",
    dialog: false,
    // Vuetify CSS Style & Props
    btnStyl: {
      margin: "34px 0",
    },
    dialogProps: {
      persistent: true,
      "max-width": "700px",
    },
    btnProps: {
      color: "deep-orange",
      outlined: true,
      rounded: true,
    },
    icon: "fas fa-edit",
    iconProps: {
      left: true,
    },
    textProp: {
      class: "grey--text text-caption mr-2",
    },
    starProps: {
      size: 18,
      color: "amber",
      dense: true,
      "half-increments": true,
    },
  }),

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
      kindness: "GET_KINDNESS",
      price: "GET_PRICE",
      contract: "GET_CONTRACT",
    }),
  },

  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "UPDATE_DIALOG") {
        this.dialog = this.$store.getters.GET_DIALOG;
      }
    });
  },

  methods: {
    async handleEventSubmit() {
      try {
        const resp = await this.$api.review.get({ baseId: this.estate.id, subIds: [this.user.id] });
        if (resp && resp.status === 204) {
          const current = new Date();
          // Fix-me: Depeding on kakao profile, needed to decouple
          await this.$api.review.post({
            baseId: this.estate.id,
            data: {
              userId: this.user.id,
              avatar: this.user.avatar,
              nickname: this.user.nickname,
              time: current.toLocaleDateString(),
              rating: this.rating,
              kindness: this.kindness,
              price: this.price,
              contract: this.contract,
              title: this.title,
              text: this.text,
            },
          });
          await this.$api.reviewRatings.put({
            baseId: this.estate.id,
            data: { rating: this.rating },
          });
          await this.$api.reviewsByLike.post({
            baseId: this.estate.id,
            data: { user: this.user.id },
          });
          await this.$api.reviewsByTime.post({
            baseId: this.estate.id,
            data: { user: this.user.id },
          });
          this.$store.dispatch("getStars", this.estate.id);
        }
        await this.clearReview();
      } catch (err) {
        console.error(err);
      }
    },

    handleEventTitle(title) {
      this.title = title;
    },

    handleEventText(text) {
      this.text = text;
    },

    clearReview() {
      this.rating = 0.0;
      this.title = "";
      this.text = "";
      this.$store.commit("UPDATE_KINDNESS", "");
      this.$store.commit("UPDATE_PRICE", "");
      this.$store.commit("UPDATE_CONTRACT", null);
      this.$store.commit("UPDATE_DIALOG", false);
    },

    onClicked() {
      if (this.isloggedIn() === false) {
        alert("로그인 후, 사용 가능합니다.");
        this.gotoLogin();
        return;
      }
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
