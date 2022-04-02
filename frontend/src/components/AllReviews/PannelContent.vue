<template>
  <div>
    <v-expansion-panel-content>
      <v-card-text v-text="content" />
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
