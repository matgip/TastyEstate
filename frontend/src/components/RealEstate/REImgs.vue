<template>
  <div>
    <v-row>
      <v-col v-bind="colProps" v-for="i in images" :key="i">
        <v-img v-bind="imgProps" :src="getImgURL(estateID, i)">
          <template #placeholder>
            <v-row v-bind="rowProps">
              <v-progress-circular v-bind="progressProps" />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    images: [1, 2, 3, 4, 5, 6],
    colProps: {
      class: "d-flex child-flex",
      cols: "2",
    },
    rowProps: {
      class: "fill-height ma-0",
      align: "center",
      justify: "center",
    },
    imgProps: {
      class: "grey lighten-2",
      "aspect-ratio": "1",
    },
    progressProps: {
      indeterminate: true,
      color: "grey lighten-5",
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
      return `http://localhost:3000/upload/${estateID}?image=${imgNum}`;
    },
  },
};
</script>
