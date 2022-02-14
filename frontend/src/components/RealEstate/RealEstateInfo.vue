<template>
  <div>
    <v-card-text>
      <div>
        <v-icon x-small>fas fa-map-marker-alt</v-icon>
        {{ estateInfo.address_name }}
      </div>
      <div>
        <v-icon x-small>fas fa-book</v-icon>
        {{ estateInfo.phone }}
      </div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    estateInfo: {
      type: Object,
      required: true,
      validator: function(value) {
        if (value.address_name == undefined) return false;
        if (value.phone == undefined) return false;
        return true;
      },
    },
  },
  methods: {},
};
</script>
