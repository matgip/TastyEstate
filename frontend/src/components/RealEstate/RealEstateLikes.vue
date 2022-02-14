<template>
  <div>
    <v-btn class="ma-2" color="deep-orange" x-small outlined rounded>
      <v-icon left x-small>
        fas fa-heart
      </v-icon>
      좋아요({{ likes }})
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    likes: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
  methods: {},
};
</script>
