<template>
  <div>
    <v-tabs :style="tabsStyl" v-bind="tabsProps">
      <v-tab @click="onClick">좋아요 순</v-tab>
      <v-tab @click="onClick">최신 순</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
      validator: function(value) {
        return value !== null;
      },
    },
  },

  data() {
    return {
      // Vuetify CSS Style & Props
      tabsStyl: {
        margin: "0px 18px",
      },
      tabsProps: {
        left: true,
      },
    };
  },
};
</script>
