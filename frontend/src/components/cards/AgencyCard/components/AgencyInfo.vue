<template>
  <div>
    <div>
      <v-icon v-bind="iconProps">{{ addrIcon }}</v-icon>
      {{ agencyInfo.address_name }}
    </div>
    <div>
      <v-icon v-bind="iconProps">{{ phoneIcon }}</v-icon>
      {{ agencyInfo.phone }}
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
    agencyInfo: {
      type: Object,
      required: true,
      validator: function(value) {
        if (value.address_name == undefined) return false;
        if (value.phone == undefined) return false;
        return true;
      },
    },
  },
};
</script>
