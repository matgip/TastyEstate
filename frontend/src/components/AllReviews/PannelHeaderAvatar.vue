<template>
  <div>
    <v-avatar v-bind="avatarProps">
      <img v-if="avatar" alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
      <v-icon v-else v-text="icon"></v-icon>
    </v-avatar>
  </div>
</template>

<script>
export default {
  props: ["avatar", "icon"],
  data: () => ({
    avatarProps: {
      size: "36px",
    },
  }),
};
</script>
