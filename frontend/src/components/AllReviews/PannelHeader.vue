<template>
  <div>
    <v-expansion-panel-header>
      <v-row v-bind="rowProps">
        <v-col v-bind="colProps">
          <Avatar :avatar="review.avatar" :icon="review.icon" />
          <Stars :stars="review.stars" />
          <Likes :likes="review.likes" />
        </v-col>
        <v-col v-bind="colProps">
          <strong v-html="review.title" />
        </v-col>
      </v-row>
    </v-expansion-panel-header>
  </div>
</template>

<script>
import Avatar from "./PannelHeaderAvatar.vue";
import Stars from "./PannelHeaderStars.vue";
import Likes from "./PannelHeaderLikes.vue";

export default {
  props: {
    review: {
      type: Object,
      required: true,
      validator: function(value) {
        if (value.stars == undefined) return false;
        if (value.likes == undefined) return false;
        if (value.title == undefined) return false;
        return true;
      },
    },
  },
  components: {
    Avatar,
    Stars,
    Likes,
  },
  data: () => ({
    rowProps: {
      align: "center",
      class: "spacer",
      "no-gutters": true,
    },
    colProps: {
      cols: "6",
      sm: "4",
      md: "6",
    },
  }),
};
</script>
