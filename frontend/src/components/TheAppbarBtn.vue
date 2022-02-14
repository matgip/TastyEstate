<template>
  <v-btn x-small plain depressed color="deep-orange" @click="method">
    <v-icon left>{{ icon }}</v-icon>
    {{ button }}
  </v-btn>
</template>

<script>
export default {
  props: {
    method: Function,
    icon: String,
    button: String,
  },
};
</script>
