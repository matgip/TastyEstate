<template>
  <div>
    <v-expansion-panel-header>
      <v-row v-bind="rowProps">
        <v-col v-bind="colProps">
          <Avatar :avatar="review.avatar" :icon="review.icon" />
        </v-col>

        <v-col v-bind="colProps">
          <Likes :likes="review.likes" />
        </v-col>

        <v-col v-bind="colProps">
          <strong v-html="review.title"></strong>
        </v-col>
      </v-row>
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
    },
    colProps: {
      cols: "4",
      sm: "2",
    },
  }),
};
</script>
