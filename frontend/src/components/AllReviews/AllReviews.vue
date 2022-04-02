<template>
  <div class="wrapper">
    <ReviewsLayout v-for="(review, i) in reviews" :key="i">
      <Avatar slot="Avatar" :avatar="review.avatar" />
      <Stars slot="Rating" :rating="review.rating" />
      <Likes slot="Likes" :likes="review.likes" />
      <Title slot="Title" :title="review.title" />
      <Content slot="Content" :content="review.content" />
    </ReviewsLayout>

    <Pagenation :totalCount="totalCount" />
  </div>
</template>

<script>
import ReviewsLayout from "./ReviewsLayout.vue";
import Avatar from "./ReviewsAvatar.vue";
import Stars from "./ReviewsStars.vue";
import Likes from "./ReviewsLikes.vue";
import Title from "./ReviewsTitle.vue";
import Content from "./ReviewsContent.vue";
import Pagenation from "./ReviewsPagination.vue";

export default {
  components: {
    ReviewsLayout,
    Avatar,
    Stars,
    Likes,
    Title,
    Content,
    Pagenation,
  },
  computed: {
    totalCount() {
      return this.reviews.length;
    },
  },
  data: () => ({
    reviews: [
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        rating: 4.5,
        likes: 3,
        title: "추천합니다",
        content: "굿",
      },
      {
        rating: 5.0,
        likes: 1,
        title: "사장님이 친절하시네요",
        content: "사장님 나이스",
      },
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        rating: 4.5,
        likes: 3,
        title: "추천합니다",
        content: "굿",
      },
      {
        rating: 5.0,
        likes: 1,
        title: "사장님이 친절하시네요",
        content: "사장님 나이스",
      },
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        rating: 4.5,
        likes: 3,
        title: "추천합니다",
        content: "굿",
      },
      {
        rating: 5.0,
        likes: 1,
        title: "사장님이 친절하시네요",
        content: "사장님 나이스",
      },
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        rating: 4.5,
        likes: 3,
        title: "추천합니다",
        content: "굿",
      },
      {
        rating: 5.0,
        likes: 1,
        title: "사장님이 친절하시네요",
        content: "사장님 나이스",
      },
    ],
  }),
};
</script>
