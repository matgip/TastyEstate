<template>
  <v-btn x-small plain depressed color="deep-orange" @click="method">
    <v-icon left>{{ icon }}</v-icon>
    {{ button }}
  </v-btn>
</template>

<script>
export default {
  props: {
    method: {
      type: Function,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
    icon: {
      type: String,
      required: true,
      validator: function(value) {
        if (value.indexOf("fas") != -1) return true;
        if (value.indexOf("mdi") != -1) return true;
        return false;
      },
    },
    button: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
};
</script>
