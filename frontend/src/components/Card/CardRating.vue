<template>
  <div>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating :value="4.5" size="18" color="amber" dense readonly half-increments></v-rating>
        <div class="grey--text ms-4">{{ rating }} ({{ likes }})</div>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    rating: Number,
    likes: Number,
  },
  methods: {},
};
</script>
