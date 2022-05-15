<template>
  <div>
    <v-card>
      <v-divider />

      <v-card-text>
        <div>
          <!-- 리뷰 user 정보 -->
          <v-avatar v-bind="avatarProps">
            <img v-if="review.avatar" :src="review.avatar" />
            <v-icon v-else v-text="avatarIcon" />
          </v-avatar>

          {{ review.nickname }}

          <span class="review_timestamp">{{ review.time }}</span>
        </div>
      </v-card-text>

      <v-card-text>
        <v-row align="center">
          <!-- 리뷰 평점 -->
          <div>
            <v-row v-bind="rowProps">
              <v-rating v-bind="ratingProps" :value="review.rating" />
              <div v-bind="textProps">({{ review.rating }})</div>
            </v-row>
          </div>
          <!-- 리뷰 '좋아요' 개수 -->
          <div>
            <BaseButton
              :btn-props="btnProps"
              :icon-props="iconProps"
              :on-click="sendLikeEvent"
              :icon="'fas fa-thumbs-up'"
              :button="review.likes"
            />
          </div>
        </v-row>
      </v-card-text>

      <!-- 리뷰 제목 -->
      <v-card-title>
        <div>{{ review.title }}</div>
      </v-card-title>

      <!-- 리뷰 내용 -->
      <v-card-text>
        <div>{{ review.text }}</div>
      </v-card-text>

      <v-divider />
    </v-card>
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },

  data: () => ({
    // Vuetify
    avatarProps: {
      size: "36px",
    },
    avatarIcon: "fas fa-user-large",
    rowProps: {
      align: "center",
      class: "ml-2",
    },
    ratingProps: {
      size: 18,
      color: "amber",
      dense: true,
      readonly: true,
      "half-increments": true,
    },
    textProps: {
      class: "grey--text mx-2",
    },
    btnProps: {
      class: "ml-4",
      depressed: true,
      label: true,
      small: true,
    },
    iconProps: {
      left: true,
      color: "deep-orange",
    },
  }),

  props: {
    review: {
      type: Object,
      required: true,
      validator: function(review) {
        if (!review.nickname && !review.time && !review.rating && !review.likes && !review.title && !review.text)
          return false;
        return true;
      },
    },
  },

  methods: {
    sendLikeEvent() {
      this.$emit("like-review", this.review.userId);
    },
  },
};
</script>

<style>
.review_timestamp {
  font-size: 8px;
}
</style>
