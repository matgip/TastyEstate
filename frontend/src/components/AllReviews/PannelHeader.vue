<template>
  <div>
    <v-expansion-panel-header>
      <v-row v-bind="rowProps">
        <v-col v-bind="avatarColProps">
          <Avatar :avatar="review.avatar" :icon="review.icon" />
        </v-col>

        <v-col v-bind="likesColProps">
          <Likes :likes="review.likes" />
        </v-col>
      </v-row>

      <strong v-html="review.title"></strong>
    </v-expansion-panel-header>
  </div>
</template>

<script>
import Avatar from "./PannelHeaderAvatar.vue";
import Likes from "./PannelHeaderLikes.vue";

export default {
  props: ["review"],
  components: {
    Avatar,
    Likes,
  },
  data: () => ({
    rowProps: {
      align: "center",
      class: "spacer",
      "no-gutters": true,
    },
    avatarColProps: {
      cols: "4",
      sm: "2",
      md: "1",
    },
    likesColProps: {
      class: "text-no-wrap",
      cols: "5",
      sm: "3",
    },
  }),
};
</script>
