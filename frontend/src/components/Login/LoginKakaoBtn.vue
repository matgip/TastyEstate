<template>
  <v-btn color="yellow lighten-1" @click="method">
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

<style scoped>
.v-btn {
  width: 400px;
}
</style>
