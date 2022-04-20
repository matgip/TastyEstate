<template>
  <v-btn v-bind="btnProps" @click="onClick">
    <v-icon v-bind="iconProps">{{ icon }}</v-icon>
    {{ button }}
  </v-btn>
</template>

<script>
export default {
  props: {
    onClick: {
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
      required: true,
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
