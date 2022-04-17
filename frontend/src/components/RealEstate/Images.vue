<template>
  <div>
    <v-carousel v-bind="carouselProps" style="width: 140px; height: 168px;">
      <v-carousel-item v-for="i in images" :key="i" v-bind="carouselItemProps">
        <img :src="getImgURL(estateID, i)" style="width: 140px; height: 168px;" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  methods: {
    getImgURL(estateID, imgNum) {
      return `/api/upload/${estateID}?image=${imgNum}`;
    },
  },
  data: () => ({
    images: [1, 2, 3, 4, 5, 6],
    // Vuetify CSS style props
    carouselProps: {
      height: "400px",
      "hide-delimiters": true,
      "show-arrows-on-hover": true,
    },
    carouselItemProps: {
      transition: "fade-transition",
      "reverse-transition": "fade-transition",
    },
  }),
  props: {
    estateID: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
};
</script>
