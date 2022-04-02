<template>
  <div class="wrapper space">
    <v-divider />
    <Pannels :reviews="reviews" />
  </div>
</template>

<script>
import Pannels from "./Pannels.vue";

export default {
  components: {
    Pannels,
  },
  data: () => ({
    reviews: [
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        stars: 4.5,
        likes: 3,
        title: "추천합니다",
        content: "굿",
      },
      {
        stars: 5.0,
        likes: 1,
        title: "사장님이 친절하시네요",
        content: "사장님 나이스",
      },
    ],
  }),
};
</script>

<style scoped></style>
