<template>
  <div>
    <div>
      <v-icon v-bind="iconProps">{{ addrIcon }}</v-icon>
      {{ estateInfo.address_name }}
    </div>
    <div>
      <v-icon v-bind="iconProps">{{ phoneIcon }}</v-icon>
      {{ estateInfo.phone }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    addrIcon: "fas fa-map-marker-alt",
    phoneIcon: "fas fa-book",
    iconProps: {
      "x-small": true,
    },
  }),
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
