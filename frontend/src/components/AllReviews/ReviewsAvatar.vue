<template>
  <div>
    <v-avatar v-bind="avatarProps">
      <img v-if="avatar" alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
      <v-icon v-else v-text="avatarIcon" />
    </v-avatar>
  </div>
</template>

<script>
export default {
  props: ["avatar"],
  data: () => ({
    avatarProps: {
      size: "36px",
    },
    avatarIcon: "mdi-account-multiple",
  }),
};
</script>
