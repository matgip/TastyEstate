<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col v-for="i in images" ref="images" :key="i" class="d-flex child-flex" cols="4">
          <v-img v-bind:src="getImageURL(estateID, i)" aspect-ratio="1" class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [1, 2, 3, 4, 5, 6],
    };
  },
  props: {
    estateID: String,
  },
  methods: {
    getImageURL(estateID, imgNum) {
      return `http://localhost:3000/upload/${estateID}?image=${imgNum}`;
    },
  },
};
</script>
