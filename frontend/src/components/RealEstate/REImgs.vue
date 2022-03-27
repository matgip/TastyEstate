<template>
  <div>
    <v-row>
      <v-carousel>
        <v-carousel-item v-for="i in images" :key="i" :src="getImgURL(estateID, i)" v-bind="carouselProps" />
      </v-carousel>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    images: [1, 2, 3, 4, 5, 6],
    carouselProps: {
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
  methods: {
    getImgURL(estateID, imgNum) {
      return `/api/upload/${estateID}?image=${imgNum}`;
    },
  },
};
</script>
