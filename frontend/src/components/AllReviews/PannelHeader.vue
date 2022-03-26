<template>
  <div>
    <v-expansion-panel-header>
      <v-row v-bind="rowProps">
        <v-col v-bind="avatarColProps">
          <v-avatar v-bind="avatarProps">
            <img v-if="review.avatar" alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
            <v-icon v-else :color="review.color" v-text="review.icon"></v-icon>
          </v-avatar>
        </v-col>

        <v-col v-bind="titleColProps">
          <v-chip v-if="review.new" v-bind="titleChipProps" :color="`${review.color} lighten-4`">
            {{ review.new }} new
          </v-chip>
          <strong v-html="review.title"></strong>
        </v-col>

        <v-col v-if="review.excerpt" v-bind="excerptProps">
          &mdash;
          {{ review.excerpt }}
        </v-col>
      </v-row>
    </v-expansion-panel-header>
  </div>
</template>

<script>
export default {
  props: ["review"],
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
    avatarProps: {
      size: "36px",
    },
    titleColProps: {
      class: "text-no-wrap",
      cols: "5",
      sm: "3",
    },
    titleChipProps: {
      class: "ml-0 mr-2 black--text",
      label: true,
      small: true,
    },
    excerptProps: {
      class: "grey--text text-truncate hidden-sm-and-down",
    },
  }),
};
</script>
