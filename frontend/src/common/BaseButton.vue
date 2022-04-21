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
      validator: function(func) {
        return func !== null;
      },
    },
    icon: {
      type: String,
      validator: function(icon) {
        if (icon.indexOf("fas") !== -1) return true;
        if (icon.indexOf("mdi") !== -1) return true;
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
