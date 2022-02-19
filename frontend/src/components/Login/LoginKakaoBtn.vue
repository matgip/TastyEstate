<template>
  <v-btn v-bind="btnProps" @click="method">
    <v-icon v-bind="iconProps">{{ icon }}</v-icon>
    {{ button }}
  </v-btn>
</template>

<script>
export default {
  data: () => ({
    btnProps: {
      color: "yellow lighten-1",
    },
    iconProps: {
      left: true,
    },
  }),
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

<style scoped>
.v-btn {
  width: 400px;
}
</style>
