<template>
  <div>
    <v-carousel v-bind="cruslProps" style="width: 140px; height: 168px;">
      <v-carousel-item v-for="i in images" :key="i" v-bind="carouselItemProps">
        <img :src="getImgUrl(estateId, i)" style="width: 140px; height: 168px;" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  methods: {
    getImgUrl(estateId, imgNum) {
      return `/api/upload/${estateId}?image=${imgNum}`;
    },
  },
  data: () => ({
    images: [1, 2, 3, 4, 5, 6],
    // Vuetify CSS Style & Props
    cruslStyle: {},
    cruslProps: {
      "hide-delimiters": true,
      "show-arrows-on-hover": true,
    },
    carouselItemProps: {
      transition: "fade-transition",
      "reverse-transition": "fade-transition",
    },
  }),
  props: {
    estateId: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
};
</script>
