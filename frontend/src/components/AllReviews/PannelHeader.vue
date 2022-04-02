<template>
  <div>
    <v-expansion-panel-header>
      <v-row v-bind="rowProps">
        <v-col>
          <Avatar :avatar="review.avatar" :icon="review.icon" />
          <Stars :stars="review.stars" />
          <Likes :likes="review.likes" />
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
  components: {
    Avatar,
    Stars,
    Likes,
  },
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
  data: () => ({
    rowProps: {
      align: "center",
      class: "spacer",
      "no-gutters": true,
    },
  }),
};
</script>
