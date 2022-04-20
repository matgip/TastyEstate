<template>
  <div>
    <v-tabs :style="tabsStyl" v-bind="tabsProps">
      <v-tab id="like" @click="onclick">좋아요 순</v-tab>
      <v-tab id="time" @click="onclick">최신 순</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  props: {
    onclick: {
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
