<template>
  <div>
    <v-expansion-panel-content>
      <v-divider />
      <v-card-text v-text="content"></v-card-text>
    </v-expansion-panel-content>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
};
</script>
