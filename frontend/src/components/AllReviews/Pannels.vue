<template>
  <div>
    <v-container v-bind="containerProps">
      <v-row v-bind="rowProps">
        <v-expansion-panels v-bind="pannelsProps">
          <v-expansion-panel v-bind="pannelProps" v-for="(review, i) in reviews" :key="i">
            <PannelHeader :review="review" />
            <PannelContent :content="review.content" />
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PannelHeader from "./PannelHeader.vue";
import PannelContent from "./PannelContent.vue";

export default {
  components: {
    PannelHeader,
    PannelContent,
  },
  props: ["reviews"],
  data: () => ({
    containerProps: {
      fluid: true,
    },
    rowProps: {
      align: "center",
    },
    pannelsProps: {
      popout: true,
    },
    pannelProps: {
      "hide-actions": true,
    },
  }),
};
</script>

<style></style>
