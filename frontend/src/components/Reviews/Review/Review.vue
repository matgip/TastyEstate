<template>
  <div>
    <v-card>
      <v-divider />

      <v-card-text>
        <div>
          <!-- user profile -->
          <v-avatar v-bind="avatarProps">
            <img v-if="review.avatar" :src="review.avatar" />
            <v-icon v-else v-text="avatarIcon" />
          </v-avatar>
          {{ review.nickname }}
          <span class="reviewed-time">{{ review.time }}</span>
        </div>
      </v-card-text>

      <v-card-text>
        <v-row align="center">
          <!-- review stars -->
          <div>
            <v-row v-bind="rowProps">
              <v-rating v-bind="ratingProps" :value="review.rating" />
              <div v-bind="textProps">({{ review.rating }})</div>
            </v-row>
          </div>
          <!-- review likes -->
          <div>
            <base-button
              :btn-props="btnProps"
              :icon-props="iconProps"
              :on-click="sendLikeEvent"
              :icon="'fas fa-thumbs-up'"
              :button="review.likes"
            />
          </div>
        </v-row>
      </v-card-text>

      <!-- review title -->
      <v-card-title>
        <div>{{ review.title }}</div>
      </v-card-title>

      <!-- review contents -->
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
    // Vuetify CSS Style & Props
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
.reviewed-time {
  font-size: 8px;
}
</style>
