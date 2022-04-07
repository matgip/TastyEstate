<template>
  <div>
    <v-avatar v-bind="avatarProps">
      <img v-if="avatar" alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
      <v-icon v-else v-text="avatarIcon" />
    </v-avatar>
    {{ nickName }}
    <span id="time">{{ timeStamp }}</span>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
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
