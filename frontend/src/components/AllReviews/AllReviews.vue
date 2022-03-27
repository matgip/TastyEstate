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
        name: "John Leider",
        likes: 3,
        title: "추천합니다",
        content:
          "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.",
      },
      {
        icon: "mdi-account-multiple",
        name: "Social",
        likes: 1,
        title: "사장님이 친절하시네요",
        content:
          "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.",
      },
    ],
  }),
};
</script>

<style scoped></style>
