<template>
  <div>
    <v-row>
      <v-carousel v-bind="carouselProps">
        <v-carousel-item v-for="i in images" :key="i" :src="getImgURL(estateID, i)" v-bind="carouselItemProps" />
      </v-carousel>
    </v-row>
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
