<template>
  <div>
    <v-chip v-if="likes" v-bind="likesProps"> {{ likes }} 좋아요 </v-chip>
  </div>
</template>

<script>
export default {
  props: ["likes"],
  data: () => ({
    likesProps: {
      color: "red lighten-4",
      class: "ml-0 mr-2 black--text",
      label: true,
      small: true,
    },
  }),
};
</script>
