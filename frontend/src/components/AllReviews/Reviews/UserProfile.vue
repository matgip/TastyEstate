<template>
  <div>
    <v-avatar v-bind="avatarProps">
      <img v-if="avatarURL" :src="avatarURL" />
      <v-icon v-else v-text="avatarIcon" />
    </v-avatar>
    {{ nickName }}
    <span id="time">{{ timeStamp }}</span>
  </div>
</template>

<script>
export default {
  props: {
    avatarURL: {
      type: String,
    },
    nickName: {
      type: String,
      required: true,
      validator: function(value) {
        return value !== null;
      },
    },
    timeStamp: {
      type: String,
      required: true,
      validator: function(value) {
        return value !== null;
      },
    },
  },
  data: () => ({
    // Vuetify CSS style props
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
