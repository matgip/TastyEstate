<template>
  <v-btn v-bind="btnProps" @click="method">
    <v-icon v-bind="iconProps">{{ icon }}</v-icon>
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
        return value !== null;
      },
    },
    icon: {
      type: String,
      validator: function(value) {
        if (value.indexOf("fas") !== -1) return true;
        if (value.indexOf("mdi") !== -1) return true;
        return false;
      },
    },
    button: {
      type: String,
    },
    btnProps: {
      type: Object,
    },
    iconProps: {
      type: Object,
    },
  },
};
</script>
