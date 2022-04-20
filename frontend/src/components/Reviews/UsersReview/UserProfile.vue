<template>
  <div>
    <v-avatar v-bind="avatarProps">
      <img v-if="avatarUrl" :src="avatarUrl" />
      <v-icon v-else v-text="avatarIcon" />
    </v-avatar>
    {{ nickname }}
    <span id="time">{{ timestamp }}</span>
  </div>
</template>

<script>
export default {
  props: {
    avatarUrl: {
      type: String,
    },
    nickname: {
      type: String,
      required: true,
      validator: function(value) {
        return value !== null;
      },
    },
    timestamp: {
      type: String,
      required: true,
      validator: function(value) {
        return value !== null;
      },
    },
  },
  data: () => ({
    // Vuetify CSS Style & Props
    avatarProps: {
      size: "36px",
    },
    avatarIcon: "fas fa-user-large",
  }),
};
</script>

<style scoped>
#time {
  font-size: 8px;
}
</style>
